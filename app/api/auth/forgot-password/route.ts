import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import connectToDatabase from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });

    // Don't reveal if user exists (security best practice)
    if (!user) {
      return NextResponse.json(
        {
          message: "If this email exists, a password reset link has been sent",
        },
        { status: 200 },
      );
    }

    // Generate reset token (10 minute validity)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save token to database
    user.passwordResetToken = resetTokenHash;
    user.passwordResetTokenExpires = tokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password?token=${resetToken}`;

    // Send email via shared mail utility
    const { success, error } = await sendPasswordResetEmail(email, resetUrl);

    if (!success) {
      console.error("Email sending error:", error);
      // Clear the reset token if email fails
      user.passwordResetToken = null;
      user.passwordResetTokenExpires = null;
      await user.save();

      return NextResponse.json(
        { message: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Link sent to the email." },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 },
    );
  }
}
