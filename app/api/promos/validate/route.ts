import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Promo from "@/models/Promo";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { code, subtotal } = await request.json();

    if (!code || !subtotal) {
      return NextResponse.json(
        { success: false, message: "Code and subtotal are required" },
        { status: 400 }
      );
    }

    const promo = await Promo.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!promo) {
      return NextResponse.json(
        { success: false, message: "Invalid or inactive promo code" },
        { status: 404 }
      );
    }

    // Check expiry date
    if (new Date() > new Date(promo.expiryDate)) {
      return NextResponse.json(
        { success: false, message: "Promo code has expired" },
        { status: 400 }
      );
    }

    // Check usage limit
    if (
      promo.maxUsageCount &&
      promo.usageCount >= promo.maxUsageCount
    ) {
      return NextResponse.json(
        { success: false, message: "Promo code usage limit reached" },
        { status: 400 }
      );
    }

    // Check minimum order amount
    if (subtotal < promo.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order amount of $${promo.minOrderAmount} required`,
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discount = 0;
    if (promo.discountType === "percentage") {
      discount = (subtotal * promo.discountValue) / 100;
      if (promo.maxDiscount) {
        discount = Math.min(discount, promo.maxDiscount);
      }
    } else {
      discount = promo.discountValue;
      if (promo.maxDiscount) {
        discount = Math.min(discount, promo.maxDiscount);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        discount: parseFloat(discount.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Error validating promo:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
