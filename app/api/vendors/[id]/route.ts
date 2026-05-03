import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Vendor from "@/models/Vendor";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const pathname = req.nextUrl.pathname;
        const vendorId = pathname.split("/").pop() || "";

        if (!vendorId) {
            return NextResponse.json(
                { success: false, message: "Vendor ID is required" },
                { status: 400 }
            );
        }

        // Try finding by vendorId field first, then by _id
        let vendor = await Vendor.findOne({ vendorId });

        if (!vendor) {
            // Fallback to MongoDB _id
            vendor = await Vendor.findById(vendorId);
        }

        if (!vendor) {
            return NextResponse.json(
                { success: false, message: "Vendor not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: vendor });
    } catch (error) {
        console.error("Error fetching vendor:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
