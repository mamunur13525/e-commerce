import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const addressId = id;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return NextResponse.json(
        { success: false, message: "Invalid address ID" },
        { status: 400 }
      );
    }

    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Find and remove the address
    const addressIndex = user.addresses.findIndex(
      (addr: any) => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    const wasDefault = user.addresses[addressIndex].isDefault;
    user.addresses.splice(addressIndex, 1);

    // If we deleted the default address and there are other addresses, make the first one default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete address error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
