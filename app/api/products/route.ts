import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get("category");
        const limit = searchParams.get("limit");
        
        // New filter params
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const rating = searchParams.get("rating");

        const query: Record<string, any> = {};

        if (category && category !== "All") {
            const categories = category.split(",");
            if (categories.length > 1) {
                query.category = { $in: categories.map(c => new RegExp(`^${c}$`, "i")) };
            } else {
                 query.category = { $regex: new RegExp(`^${category}$`, "i") };
            }
        }

        // Add price filters
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Add rating filter
        if (rating) {
            query.rating = { $gte: Number(rating) };
        }

        let productQuery = Product.find(query);

        if (limit) {
            const limitNumber = parseInt(limit);
            if (!isNaN(limitNumber)) {
                productQuery = productQuery.limit(limitNumber);
            }
        }

        const products = await productQuery.exec();

        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
