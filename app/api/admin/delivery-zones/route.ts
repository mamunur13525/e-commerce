import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import DeliveryZone from "@/models/DeliveryZone";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [zones, total] = await Promise.all([
      DeliveryZone.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      DeliveryZone.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: zones,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching delivery zones:", error);
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
    const { name, city, allRemaining, fee, estimatedDelivery, isActive } = body;

    if (!name || fee === undefined || !estimatedDelivery) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, fee, estimatedDelivery",
        },
        { status: 400 }
      );
    }

    if (!allRemaining && !city) {
      return NextResponse.json(
        {
          success: false,
          message: "Either select a city or enable 'All Remaining Cities'",
        },
        { status: 400 }
      );
    }

    const zone = await DeliveryZone.create({
      name: name.trim(),
      city: allRemaining ? "" : (city?.trim() || ""),
      allRemaining: Boolean(allRemaining),
      fee: Number(fee),
      estimatedDelivery: estimatedDelivery.trim(),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdBy: (user as any)._id.toString(),
      updatedBy: (user as any)._id.toString(),
    });

    return NextResponse.json(
      { success: true, data: zone, message: "Delivery zone created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating delivery zone:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}