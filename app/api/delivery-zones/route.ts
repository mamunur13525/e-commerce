import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DeliveryZone from "@/models/DeliveryZone";

export async function GET() {
  try {
    await connectToDatabase();

    const zones = await DeliveryZone.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: zones,
    });
  } catch (error) {
    console.error("Error fetching delivery zones:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}