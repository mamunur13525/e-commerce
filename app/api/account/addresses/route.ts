import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await request.json();
    const { full_name,  street, city, state, zip, country, isDefault } = body;

    // Validation
    if (!full_name || !street || !city || !state || !zip) {
      return NextResponse.json(
        { success: false, message: "All address fields are required" },
        { status: 400 }
      );
    }

    // If this is set as default, unset all other default addresses
    if (isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    } else if (user.addresses.length === 0) {
      // If this is the first address, make it default
      body.isDefault = true;
    }

    // Create new address
    const newAddress = {
      _id: new mongoose.Types.ObjectId(),
      full_name,
      street,
      city,
      state,
      zip,
      country: country || "Bangladesh",
      isDefault: isDefault || (user.addresses.length === 0),
    };

    user.addresses.push(newAddress);
    await user.save();

    return NextResponse.json({
      success: true,
      address: newAddress,
    });
  } catch (error: any) {
    console.error("Add address error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

