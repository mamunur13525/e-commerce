import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

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

    const order = await Order.findOne({ _id: id, user: decoded.userId })
      .populate("items.product")
      .lean();

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

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

    const formattedOrder = { ...order, items };

    return NextResponse.json({
      success: true,
      data: formattedOrder,
    });
  } catch (error: any) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
