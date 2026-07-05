import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDB from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required." },
        { status: 400 }
      );
    }

    // Find the order by orderId
    const order = await Order.findOne({
      orderId: orderId.trim().toUpperCase(),
    }).populate("items.product").lean() as any;

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No order found with that Order ID." },
        { status: 404 }
      );
    }

    // Format items to look like a sub-order structure for backward-compatibility with UI
    const subOrders = [
      {
        products: (order.items || []).map((item: any) => ({
          id: item.product?._id?.toString() || item.product?.toString(),
          name: item.product?.name || "Product",
          quantity: item.quantity,
          price: item.product?.price || item.price,
          discount: item.product?.discount || 0,
          finalPrice: item.price,
          images: item.product?.image || {},
          variant: item.variant,
        })),
      },
    ];

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
        onlinePaymentDiscount: order.onlinePaymentDiscount || 0,
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
