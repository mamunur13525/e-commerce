import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Promo from "@/models/Promo";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    let { code, subtotal, productIds, categoryIds, userId } = await request.json();
    code = code?.trim();

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

    if (new Date() > new Date(promo.expiryDate)) {
      return NextResponse.json(
        { success: false, message: "Promo code has expired" },
        { status: 400 }
      );
    }

    if (
      promo.maxUsageCount &&
      promo.usageCount >= promo.maxUsageCount
    ) {
      return NextResponse.json(
        { success: false, message: "Promo code usage limit reached" },
        { status: 400 }
      );
    }

    if (subtotal < promo.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order amount of $${promo.minOrderAmount} required`,
        },
        { status: 400 }
      );
    }

    if (promo.applicableToFirstOrder && userId) {
      const existingOrders = await import("@/models/Order").then(m => m.default.countDocuments({ user: userId }));
      if (existingOrders > 0) {
        return NextResponse.json(
          { success: false, message: "This promo code is only applicable to first order" },
          { status: 400 }
        );
      }
    }

    if (promo.specificProductIds?.length > 0) {
      if (!productIds || productIds.length === 0) {
        return NextResponse.json(
          { success: false, message: "This promo code is only applicable to specific products" },
          { status: 400 }
        );
      }
      const hasValidProduct = productIds.some((id: string) => promo.specificProductIds.includes(id));
      if (!hasValidProduct) {
        return NextResponse.json(
          { success: false, message: "This promo code is not applicable to the products in your cart" },
          { status: 400 }
        );
      }
    }

    if (promo.specificCategoryIds?.length > 0) {
      if (!categoryIds || categoryIds.length === 0) {
        return NextResponse.json(
          { success: false, message: "This promo code is only applicable to specific categories" },
          { status: 400 }
        );
      }
      const hasValidCategory = categoryIds.some((id: string) => promo.specificCategoryIds.includes(id));
      if (!hasValidCategory) {
        return NextResponse.json(
          { success: false, message: "This promo code is not applicable to the categories in your cart" },
          { status: 400 }
        );
      }
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
