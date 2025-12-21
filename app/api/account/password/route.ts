import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // If user logged in with Google, they don't have a password
    if (user.googleId && !user.password) {
      return NextResponse.json(
        { success: false, message: "Cannot update password for Google login users" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const body = await request.json();
    const { current_password, new_password } = body;

    if (!current_password || !new_password) {
      return NextResponse.json(
        { success: false, message: "Current and new password are required" },
        { status: 400 }
      );
    }

    if (new_password.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(current_password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error: any) {
    console.error("Update password error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
