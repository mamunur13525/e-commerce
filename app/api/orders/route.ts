import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import connectDB from "@/lib/db";
import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Verify authentication
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { orderItems, deliveryAddress, subtotal, deliveryFee, promoDiscount, taxes, totalPrice, paymentMethod } = body;

    // Validate request data
    if (!orderItems?.length || !deliveryAddress || !totalPrice || !paymentMethod) {
      return NextResponse.json({ success: false, message: "Missing required order fields" }, { status: 400 });
    }

    // Step 1: Check Stock Availability for all items
    for (const item of orderItems) {
      const product = await Product.findById(item.productId || item.product?._id || item.product);
      if (!product) {
        return NextResponse.json({ success: false, message: `Product not found: ${item.productId}` }, { status: 404 });
      }
      if (product.quantity < item.quantity) {
        return NextResponse.json({ 
          success: false, 
          message: `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}` 
        }, { status: 400 });
      }
    }

    // Step 2: Generate a unique orderId
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let isUnique = false;
    let newOrderId = "";
    
    while (!isUnique) {
      newOrderId = "ORD-" + Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
      const existingOrder = await Order.findOne({ orderId: newOrderId });
      if (!existingOrder) {
        isUnique = true;
      }
    }

    // Create the order in standard 'pending' state
    const order = new Order({
      user: decoded.userId,
      items: orderItems,
      deliveryAddress,
      subtotal,
      deliveryFee,
      promoDiscount,
      taxes,
      totalPrice,
      paymentMethod,
      paymentStatus: "pending",
      status: "processing",
      orderId: newOrderId,
    });

    await order.save();

    if (paymentMethod === "COD") {
      // Step 2: Decrease stock for COD orders immediately
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(
          item.productId || item.product?._id || item.product,
          { $inc: { quantity: -item.quantity } }
        );
      }

      // Clear user's active cart since order is placed directly
      await Cart.findOneAndUpdate(
        { user: decoded.userId, status: "active" },
        { $set: { items: [], totalPrice: 0, totalQuantity: 0 } }
      );

      return NextResponse.json({
        success: true,
        message: "Order placed successfully",
        orderId: order._id,
      });
    } else if (paymentMethod === "STRIPE") {
      // Create Stripe Checkout Session
      const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        client_reference_id: order._id.toString(),
        metadata: {
          orderId: order._id.toString(),
          userId: decoded.userId.toString(),
        },
        line_items: orderItems.map((item: any) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product?.name || `Product ID: ${item.product._id || item.product}`,
              // Add images or other product metadata here if available
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
          },
          quantity: item.quantity,
        })),
        // Add delivery fee, taxes, discount as separate line items or use discounts/shipping_options in Stripe API
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout?canceled=true`,
      });

      // Update order with Stripe Session ID
      order.stripeSessionId = session.id;
      await order.save();

      return NextResponse.json({
        success: true,
        message: "Stripe session created",
        sessionId: session.id,
        url: session.url,
      });
    }

    return NextResponse.json({ success: false, message: "Invalid payment method" }, { status: 400 });

  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
