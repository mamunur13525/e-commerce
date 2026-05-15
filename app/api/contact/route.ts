import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const emailResponse = await sendContactEmail({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    if (!emailResponse.success) {
      console.error("Failed to send contact email:", emailResponse.error);
      return NextResponse.json(
        { success: false, message: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
