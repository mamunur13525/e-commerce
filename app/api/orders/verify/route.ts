import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import connectDB from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ success: false, message: "Session ID is required" }, { status: 400 });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || !session.metadata?.orderId) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 400 });
    }

    const orderId = session.metadata.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    if (session.payment_status === "paid") {
      // Step 1: Mark order as paid
      order.paymentStatus = "paid";
      await order.save();

      // Step 2: Decrease stock for Stripe orders after successful payment
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { quantity: -item.quantity } }
        );
      }

      // Clear only the ordered items from the user's active cart if not a direct buy
      if (session.metadata.isDirectBuy !== "true") {
        const orderedProductIds = order.items.map((item: { product: string }) => item.product);
        await Cart.findOneAndUpdate(
          { user: decoded.userId, status: "active" },
          { $pull: { items: { product: { $in: orderedProductIds } } } }
        );
        // Recalculate cart totals
        const updatedCart = await Cart.findOne({ user: decoded.userId, status: "active" });
        if (updatedCart) {
          await updatedCart.save();
        }
      }

      return NextResponse.json({
        success: true,
        message: "Payment successful",
        orderId: order._id,
      });
    }

    return NextResponse.json({ success: false, message: "Payment not completed" }, { status: 400 });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
