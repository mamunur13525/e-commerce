import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import Promo from "@/models/Promo";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const isActive = searchParams.get("isActive");

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { code: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (isActive !== null && isActive !== "") {
      query.isActive = isActive === "true";
    }

    const skip = (page - 1) * limit;

    const [promos, total] = await Promise.all([
      Promo.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Promo.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: promos,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching promos:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { user, error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      code,
      description,
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      maxUsageCount,
      expiryDate,
      isActive,
      applicableToFirstOrder,
      specificProductIds,
      specificCategoryIds,
    } = body;

    if (!code || !discountType || discountValue === undefined || !expiryDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: code, discountType, discountValue, expiryDate",
        },
        { status: 400 }
      );
    }

    const promo = await Promo.create({
      code: code.toUpperCase().trim(),
      description: description || "",
      discountType,
      discountValue: Number(discountValue),
      maxDiscount: maxDiscount !== undefined && maxDiscount !== "" ? Number(maxDiscount) : null,
      minOrderAmount: minOrderAmount !== undefined ? Number(minOrderAmount) : 0,
      maxUsageCount: maxUsageCount !== undefined && maxUsageCount !== "" ? Number(maxUsageCount) : null,
      expiryDate: new Date(expiryDate),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      applicableToFirstOrder: Boolean(applicableToFirstOrder),
      specificProductIds: specificProductIds || [],
      specificCategoryIds: specificCategoryIds || [],
      createdBy: (user as any)._id.toString(),
      updatedBy: (user as any)._id.toString(),
    });

    return NextResponse.json(
      { success: true, data: promo, message: "Promo created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating promo:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A promo with this code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
