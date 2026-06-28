import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import Promo from "@/models/Promo";
import mongoose from "mongoose";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid promo ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Normalize numeric and nullable fields
    const updateData: Record<string, any> = {
      ...body,
      updatedBy: (user as any)._id.toString(),
    };

    if (body.discountValue !== undefined) updateData.discountValue = Number(body.discountValue);
    if (body.minOrderAmount !== undefined) updateData.minOrderAmount = Number(body.minOrderAmount);
    if (body.maxDiscount !== undefined)
      updateData.maxDiscount = body.maxDiscount !== "" && body.maxDiscount !== null ? Number(body.maxDiscount) : null;
    if (body.maxUsageCount !== undefined)
      updateData.maxUsageCount = body.maxUsageCount !== "" && body.maxUsageCount !== null ? Number(body.maxUsageCount) : null;
    if (body.expiryDate) updateData.expiryDate = new Date(body.expiryDate);
    if (body.code) updateData.code = body.code.toUpperCase().trim();

    const promo = await Promo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!promo) {
      return NextResponse.json(
        { success: false, message: "Promo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: promo,
      message: "Promo updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating promo:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A promo with this code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid promo ID" },
        { status: 400 }
      );
    }

    const promo = await Promo.findByIdAndDelete(id);

    if (!promo) {
      return NextResponse.json(
        { success: false, message: "Promo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Promo deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting promo:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
