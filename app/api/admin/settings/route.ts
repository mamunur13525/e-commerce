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
    const { onlinePaymentDiscount, tax } = body;

    const updateFields: Record<string, unknown> = {};

    if (onlinePaymentDiscount) {
      if (!onlinePaymentDiscount.type || onlinePaymentDiscount.value === undefined) {
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
      updateFields.onlinePaymentDiscount = {
        type: onlinePaymentDiscount.type,
        value: Number(onlinePaymentDiscount.value),
      } as Record<string, unknown>;
    }

    if (tax) {
      if (!tax.type || tax.value === undefined) {
        return NextResponse.json(
          { success: false, message: "Missing required fields: tax.type, tax.value" },
          { status: 400 }
        );
      }
      if (!["percentage", "fixed"].includes(tax.type)) {
        return NextResponse.json(
          { success: false, message: "Invalid tax type. Must be 'percentage' or 'fixed'" },
          { status: 400 }
        );
      }
      updateFields.tax = {
        type: tax.type,
        value: Number(tax.value),
      } as Record<string, unknown>;
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields to update" },
        { status: 400 }
      );
    }

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: updateFields },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: settings,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}