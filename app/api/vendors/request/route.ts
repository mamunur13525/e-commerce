import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Vendor from "@/models/Vendor";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { storeName, description, phone, address, city, country, website, logo, userId } = body;

        if (!storeName || !userId) {
            return NextResponse.json(
                { success: false, message: "Store name and user ID are required" },
                { status: 400 }
            );
        }

        // Check if user already has a vendor request
        const existingVendor = await Vendor.findOne({ userId });
        if (existingVendor) {
            return NextResponse.json(
                {
                    success: false,
                    message: existingVendor.vendorStatus === "pending"
                        ? "You already have a pending seller request"
                        : existingVendor.vendorStatus === "active"
                            ? "You are already a registered seller"
                            : "You have a previous seller request. Please contact support.",
                },
                { status: 409 }
            );
        }

        const vendor = await Vendor.create({
            vendorId: `VND-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
            storeName,
            description,
            phone,
            address,
            city,
            country,
            website,
            logo,
            userId,
            vendorStatus: "pending",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Seller request submitted successfully! We will review your application shortly.",
                data: vendor,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating vendor request:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
