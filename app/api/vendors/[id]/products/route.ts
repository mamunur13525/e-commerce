import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Vendor from "@/models/Vendor";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const pathname = req.nextUrl.pathname;
        const segments = pathname.split("/");
        // URL: /api/vendors/[id]/products → segments = ["", "api", "vendors", "[id]", "products"]
        const vendorId = segments[segments.length - 2] || "";

        if (!vendorId) {
            return NextResponse.json(
                { success: false, message: "Vendor ID is required" },
                { status: 400 }
            );
        }

        // Find vendor to get store info
        let vendor = await Vendor.findOne({ vendorId });
        if (!vendor) {
            vendor = await Vendor.findById(vendorId);
        }

        if (!vendor) {
            return NextResponse.json(
                { success: false, message: "Vendor not found" },
                { status: 404 }
            );
        }

        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1") || 1;
        const limit = parseInt(searchParams.get("limit") || "12") || 12;
        const skip = (page - 1) * limit;

        // Match products by store.id = vendorId
        const query = { "store.id": vendor.vendorId };

        const [products, total] = await Promise.all([
            Product.find(query).skip(skip).limit(limit).exec(),
            Product.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            data: products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                hasMore: page * limit < total,
            },
        });
    } catch (error) {
        console.error("Error fetching vendor products:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
