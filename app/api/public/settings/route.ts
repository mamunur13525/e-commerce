import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await connectToDatabase();

    let settings = await Settings.findOne().lean();

    if (!settings) {
      settings = await Settings.create({
        onlinePaymentDiscount: {
          type: "percentage",
          value: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        onlinePaymentDiscount: settings.onlinePaymentDiscount,
        tax: settings.tax,
      },
    });
  } catch (error) {
    console.error("Error fetching public settings:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
