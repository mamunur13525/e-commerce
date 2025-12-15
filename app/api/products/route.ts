import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get("category");
        const limit = searchParams.get("limit");

        const query: Record<string, any> = {};

        if (category && category !== "All") {
            query.category = { $regex: new RegExp(`^${category}$`, "i") };
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
