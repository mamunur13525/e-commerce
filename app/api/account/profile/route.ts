import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import connectToDatabase from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone || "",
        image: user.image || "",
        googleId: user.googleId,
        addresses: user.addresses || [],
        isPasswordLogin: user.password ? true : false,
      },
    });
  } catch (error: any) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    const { first_name, last_name, phone } = body;

    // Update user fields
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone || "",
        image: user.image || "",
        googleId: user.googleId,
        addresses: user.addresses || [],
      },
    });
  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
