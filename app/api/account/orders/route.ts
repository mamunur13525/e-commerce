import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Product from "@/models/Product";
import SubOrder from "@/models/SubOrder";
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
      .lean();

    const allSubOrderIds = orders.flatMap((order: any) => order.subOrderIds || []);
    const subOrders = await mongoose.model("SubOrder").find({ _id: { $in: allSubOrderIds } }).lean();

    const formattedOrders = orders.map((order: any) => {
      const orderSubOrders = subOrders.filter((so: any) => order.subOrderIds?.includes(so._id.toString()));
      const items = orderSubOrders.flatMap((so: any) => so.products.map((p: any) => ({
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
