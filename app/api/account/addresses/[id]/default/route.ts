import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const addressId = id;
    console.log({ addressId });

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

    // Find the address
    const addressIndex = user.addresses.findIndex(
      (addr: any) => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    // Unset all other default addresses
    user.addresses.forEach((addr: any) => {
      addr.isDefault = false;
    });

    // Set this address as default
    user.addresses[addressIndex].isDefault = true;

    await user.save();

    return NextResponse.json({
      success: true,
      address: user.addresses[addressIndex],
    });
  } catch (error: any) {
    console.error("Set default address error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
