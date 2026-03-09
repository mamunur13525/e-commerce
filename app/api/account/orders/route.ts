import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Build query
    const query: any = { user: decoded.userId };
    if (status) {
      query.status = status;
    }

    // Fetch orders, sorted by creation date descending
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: "items.product",
        model: Product,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
