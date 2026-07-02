import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import DeliveryZone from "@/models/DeliveryZone";
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
        { success: false, message: "Invalid delivery zone ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updateData: Record<string, any> = {
      ...body,
      updatedBy: (user as any)._id.toString(),
    };

    if (body.name) updateData.name = body.name.trim();
    if (body.city !== undefined) updateData.city = body.city ? body.city.trim() : "";
    if (body.allRemaining !== undefined) updateData.allRemaining = Boolean(body.allRemaining);
    if (body.fee !== undefined) updateData.fee = Number(body.fee);
    if (body.estimatedDelivery) updateData.estimatedDelivery = body.estimatedDelivery.trim();

    const zone = await DeliveryZone.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!zone) {
      return NextResponse.json(
        { success: false, message: "Delivery zone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: zone,
      message: "Delivery zone updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating delivery zone:", error);
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
        { success: false, message: "Invalid delivery zone ID" },
        { status: 400 }
      );
    }

    const zone = await DeliveryZone.findByIdAndDelete(id);

    if (!zone) {
      return NextResponse.json(
        { success: false, message: "Delivery zone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Delivery zone deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting delivery zone:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}