import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        // Extract product ID from URL pathname
        const pathname = req.nextUrl.pathname;
        console.log("Full pathname:", pathname);

        const productId = pathname.split('/').pop() || '';
        console.log("Extracted product ID:", productId);
        console.log("Product ID type:", typeof productId);
        console.log("Product ID length:", productId.length);

        if (!productId) {
            return NextResponse.json(
                { success: false, message: "Product ID is required" },
                { status: 400 }
            );
        }

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return NextResponse.json(
                { success: false, message: `Invalid product ID format: ${productId}` },
                { status: 400 }
            );
        }

        // Find product by MongoDB _id
        const product = await Product.findById(productId);
        console.log("Product found:", product ? "Yes" : "No");

        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: String(error) },
            { status: 500 }
        );
    }
}
