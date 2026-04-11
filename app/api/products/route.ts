import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get("category");
        const limit = searchParams.get("limit");
        const page = searchParams.get("page") || "1";

        // New filter params
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const rating = searchParams.get("rating");
        const search = searchParams.get("search");

        console.log({ category, minPrice, maxPrice, rating, limit, page, search })
        const query: Record<string, any> = {};

        if (category && category !== "All") {
            const categories = category.split(",");
            if (categories.length > 1) {
                query.category = { $in: categories.map(c => new RegExp(`^${c}$`, "i")) };
            } else {
                query.category = { $regex: new RegExp(`^${category}$`, "i") };
            }
        }

        // Add search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        }

        // Add price filters
        if (minPrice || maxPrice) {
            query.final_price = {};
            if (minPrice) query.final_price.$gte = Number(minPrice);
            if (maxPrice) query.final_price.$lte = Number(maxPrice);
        }

        // Add rating filter
        if (rating) {
            query.rating = { $lte: Number(rating) };
        }
        console.log({ query })
        let productQuery = Product.find(query);

        const pageNumber = parseInt(page) || 1;
        let limitNumber = limit ? parseInt(limit) : undefined;
        if (limitNumber === undefined) limitNumber = 12;

        const skip = (pageNumber - 1) * limitNumber;
        productQuery = productQuery.skip(skip).limit(limitNumber);

        const [products, total] = await Promise.all([
            productQuery.exec(),
            Product.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            data: products,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / limitNumber),
                hasMore: (pageNumber * limitNumber) < total
            }
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
