import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Product from "@/models/Product";
import SubOrder from "@/models/SubOrder";
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

    const order = await Order.findOne({ _id: id, user: decoded.userId }).lean();

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const subOrderIds = order.subOrderIds || [];
    const subOrders = await SubOrder.find({ _id: { $in: subOrderIds } }).lean();

      const items = subOrders.flatMap((so: any) => so.products.map((p: any) => ({
      product: {
        _id: p.id,
        name: p.name,
        image: p.images,
        price: p.price,
        discount: p.discount,
      },
      quantity: p.quantity,
      price: p.price,
      ...(p.variant && { variant: p.variant }),
    })));

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
