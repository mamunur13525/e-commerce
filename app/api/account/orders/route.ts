import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

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
      .populate("items.product")
      .lean();

    const formattedOrders = orders.map((order: any) => {
      const items = (order.items || []).map((item: any) => ({
        product: {
          _id: item.product?._id || item.product,
          name: item.product?.name || "Product",
          image: item.product?.image || {},
          price: item.product?.price || item.price,
          discount: item.product?.discount || 0,
        },
        quantity: item.quantity,
        price: item.price,
        ...(item.variant && { variant: item.variant }),
      }));
      return { ...order, items };
    });

    return NextResponse.json({
      success: true,
      data: formattedOrders,
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
