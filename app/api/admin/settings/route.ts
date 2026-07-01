import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import Settings from "@/models/Settings";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    let settings = await Settings.findOne().lean();

    if (!settings) {
      // Create default settings if none exist
      settings = await Settings.create({
        onlinePaymentDiscount: {
          type: "percentage",
          value: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const body = await request.json();
    const { onlinePaymentDiscount } = body;

    if (!onlinePaymentDiscount || !onlinePaymentDiscount.type || onlinePaymentDiscount.value === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: onlinePaymentDiscount.type, onlinePaymentDiscount.value" },
        { status: 400 }
      );
    }

    if (!["percentage", "fixed"].includes(onlinePaymentDiscount.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid discount type. Must be 'percentage' or 'fixed'" },
        { status: 400 }
      );
    }

    const settings = await Settings.findOneAndUpdate(
      {},
      {
        $set: {
          onlinePaymentDiscount: {
            type: onlinePaymentDiscount.type,
            value: Number(onlinePaymentDiscount.value),
          },
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: settings,
      message: "Settings updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}