import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DeliveryZone from "@/models/DeliveryZone";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");

    if ( !city) {
      return NextResponse.json(
        { success: false, message: "City is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find delivery zone by city
    let zone = await DeliveryZone.findOne({
      city,
      isActive: true,
    }).lean();

    // If no specific city zone found, check for "allRemaining" zone
    if (!zone) {
      zone = await DeliveryZone.findOne({
        allRemaining: true,
        isActive: true,
      }).lean();
    }

    if (!zone) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "No delivery zone found for this region",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        fee: zone.fee,
        estimatedDelivery: zone.estimatedDelivery,
        name: zone.name,
      },
    });
  } catch (error: any) {
    console.error("Error fetching delivery fee:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}