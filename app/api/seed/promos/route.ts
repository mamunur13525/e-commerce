import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Promo from "@/models/Promo";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Delete existing promos
    await Promo.deleteMany({});

    // Create sample promos
    const samplePromos = [
      {
        code: "WELCOME10",
        description: "10% off on first order",
        discountType: "percentage",
        discountValue: 10,
        minOrderAmount: 0,
        maxDiscount: null,
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        isActive: true,
        applicableToFirstOrder: true,
      },
      {
        code: "SAVE20",
        description: "20% discount on orders over ৳500",
        discountType: "percentage",
        discountValue: 20,
        minOrderAmount: 500,
        maxDiscount: null,
        expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        isActive: true,
      },
      {
        code: "FLAT150",
        description: "Flat ৳150 off on all orders",
        discountType: "fixed",
        discountValue: 150,
        minOrderAmount: 300,
        maxDiscount: 150,
        expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        isActive: true,
      },
      {
        code: "SUMMER25",
        description: "25% off - Limited time",
        discountType: "percentage",
        discountValue: 25,
        minOrderAmount: 0,
        maxDiscount: 500,
        maxUsageCount: 100,
        usageCount: 0,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
      },
    ];

    const createdPromos = await Promo.insertMany(samplePromos);

    return NextResponse.json({
      success: true,
      message: "Sample promo codes seeded successfully",
      data: createdPromos,
    });
  } catch (error) {
    console.error("Error seeding promos:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
