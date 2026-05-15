import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import User from "@/models/User";
import SubOrder from "@/models/SubOrder";
import connectDB from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { orderId, email } = body;

    if (!orderId || !email) {
      return NextResponse.json(
        { success: false, message: "Order ID and email are required." },
        { status: 400 }
      );
    }

    // Find the order by orderId
    const order = await Order.findOne({
      orderId: orderId.trim().toUpperCase(),
    }).lean() as any;

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No order found with that Order ID." },
        { status: 404 }
      );
    }

    // Verify the email belongs to the order's user
    const user = await User.findById(order.user).select("email").lean() as any;

    if (!user || user.email.toLowerCase() !== email.trim().toLowerCase()) {
      return NextResponse.json(
        { success: false, message: "No order found with that Order ID and email combination." },
        { status: 404 }
      );
    }

    // Fetch sub-orders for the items
    const subOrders = await SubOrder.find({ orderId: order.orderId }).lean();

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.orderId,
        status: order.status,
        cancelNote: order.cancelNote ?? null,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        promoDiscount: order.promoDiscount,
        taxes: order.taxes,
        totalPrice: order.totalPrice,
        subOrders: subOrders,
      },
    });
  } catch (error: unknown) {
    console.error("Error tracking order:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
