import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import connectToDatabase from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      );
    }

    const trimmedPassword = password.trim();
    if (trimmedPassword.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Hash the token to compare with stored hash
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: tokenHash,
      passwordResetTokenExpires: { $gt: new Date() }, // Token not expired
    });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Invalid or expired reset token. Please request a new password reset.",
        },
        { status: 400 }
      );
    }

    // Update password - explicitly set the password field
    user.password = trimmedPassword;
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    user.isPasswordLogin = true;
    // Mark password as modified to trigger hashing
    user.markModified("password");
    
    // Save the user
    const savedUser = await user.save();
    console.log("Password reset for user:", savedUser.email, "Password updated:", !!savedUser.password);

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
