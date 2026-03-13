import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Vendor from "@/models/Vendor";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = req.nextUrl.searchParams;
        const status = searchParams.get("status");
        const limit = searchParams.get("limit");
        const page = searchParams.get("page") || "1";
        console.log({ status, limit, page })
        const query: Record<string, unknown> = {};

        if (status) {
            query.vendorStatus = status;
        } else {
            // By default, only show active vendors
            query.vendorStatus = "active";
        }

        const pageNumber = parseInt(page) || 1;
        const limitNumber = limit ? parseInt(limit) : 12;
        const skip = (pageNumber - 1) * limitNumber;

        const [vendors, total] = await Promise.all([
            Vendor.find(query)
                .sort({ totalSales: -1 })
                .skip(skip)
                .limit(limitNumber)
                .exec(),
            Vendor.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            data: vendors,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / limitNumber),
                hasMore: pageNumber * limitNumber < total,
            },
        });
    } catch (error) {
        console.error("Error fetching vendors:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
