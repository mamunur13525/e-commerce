import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import connectToDatabase from "@/lib/db";
import nodemailer from "nodemailer";
import { Resend } from 'resend';

// Configure email transporter
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log({ email })
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
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
        { status: 200 }
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

    // Send email
    try {

      const emailSuccess = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #003d29;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>You have requested to reset your password. Click the button below to reset it.</p>
            <p><strong>This link will expire in 10 minutes.</strong></p>
            <div style="margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #003d29; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              If you did not request a password reset, please ignore this email.
            </p>
          </div>
        `,
      });
      if (emailSuccess.error || !emailSuccess.data) {
        return NextResponse.json(
          { message: "Failed to send email. Please try again later." },
          { status: 500 }
        );
      }
      console.log({ emailSuccess })
      return NextResponse.json(
        { message: "Link sent to the email." },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Clear the reset token if email fails
      user.passwordResetToken = null;
      user.passwordResetTokenExpires = null;
      await user.save();

      return NextResponse.json(
        { message: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
