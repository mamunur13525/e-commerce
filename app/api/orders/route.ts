import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import Promo from "@/models/Promo";
import User from "@/models/User";
import SubOrder from "@/models/SubOrder";
import connectDB from "@/lib/db";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "@/lib/mail";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Server-side constants
const DELIVERY_FEE = 16.0;
const TAX_RATE = 0.1; // 10%

/**
 * Validates a promo code server-side and calculates the discount amount.
 * Returns the discount amount and promo details, or null if invalid.
 */
async function validateAndCalculatePromo(
  promoCode: string,
  subtotal: number,
  userId: string,
  productIds: string[]
): Promise<{
  discount: number;
  code: string;
  discountType: string;
  discountValue: number;
  maxDiscount: number | null;
} | null> {
  const promo = await Promo.findOne({
    code: promoCode.toUpperCase(),
    isActive: true,
  });

  if (!promo) return null;

  // Check expiry
  if (new Date() > new Date(promo.expiryDate)) return null;

  // Check usage limit
  if (promo.maxUsageCount && promo.usageCount >= promo.maxUsageCount) return null;

  // Check if user already used this promo code
  const alreadyUsed = promo.usedBy?.some((usage: any) => usage.userId === userId);
  if (alreadyUsed) return null;

  // Check minimum order amount
  if (subtotal < promo.minOrderAmount) return null;

  // Check first order restriction
  if (promo.applicableToFirstOrder) {
    const existingOrders = await Order.countDocuments({ user: userId });
    if (existingOrders > 0) return null;
  }

  // Check product-specific restriction
  if (promo.specificProductIds?.length > 0) {
    const hasValidProduct = productIds.some((id: string) =>
      promo.specificProductIds.includes(id)
    );
    if (!hasValidProduct) return null;
  }

  // Calculate discount
  let discount = 0;
  if (promo.discountType === "percentage") {
    discount = (subtotal * promo.discountValue) / 100;
  } else if (promo.discountType === "fixed") {
    discount = promo.discountValue;
  }

  if (promo.maxDiscount) {
    discount = Math.min(discount, promo.maxDiscount);
  }

  return {
    discount: parseFloat(discount.toFixed(2)),
    code: promo.code,
    discountType: promo.discountType,
    discountValue: promo.discountValue,
    maxDiscount: promo.maxDiscount,
  };
}

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

    // Only accept identifiers and choices from the client
    const body = await request.json();
    const { addressId, paymentMethod, promoCode, itemIds, buyNowProductId, buyNowQuantity } = body;

    // Validate required fields
    if (!addressId || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: addressId, paymentMethod" },
        { status: 400 }
      );
    }

    if (!["COD", "STRIPE"].includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, message: "Invalid payment method" },
        { status: 400 }
      );
    }

    // Step 1: Fetch user and resolve delivery address from DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const deliveryAddress = user.addresses.id(addressId);
    if (!deliveryAddress) {
      return NextResponse.json(
        { success: false, message: "Delivery address not found" },
        { status: 404 }
      );
    }

    const orderItems: {
      product: string;
      quantity: number;
      price: number;
      variant?: string;
      name?: string;
      discount?: number;
      images?: any;
      vendorId?: string;
    }[] = [];

    const isDirectBuy = !!buyNowProductId;


    if (isDirectBuy) {
      const fetchedProduct = await Product.findById(buyNowProductId);
      if (!fetchedProduct) {
        return NextResponse.json(
          { success: false, message: `Product not found` },
          { status: 404 }
        );
      }

      const quantity = buyNowQuantity || 1;
      if (fetchedProduct.quantity < quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `Insufficient stock for ${fetchedProduct.name}. Available: ${fetchedProduct.quantity}, Requested: ${quantity}`,
          },
          { status: 400 }
        );
      }

      orderItems.push({
        product: fetchedProduct._id.toString(),
        quantity: quantity,
        price: fetchedProduct.final_price,
        name: fetchedProduct.name,
        discount: fetchedProduct.discount,
        images: fetchedProduct.image,
        vendorId: fetchedProduct.store?.id || "default",
      });
    } else {
      // Step 2: Fetch user's active cart with populated product data
      const cart = await Cart.findOne({
        user: decoded.userId,
        status: "active",
      }).populate("items.product");

      if (!cart || !cart.items || cart.items.length === 0) {
        return NextResponse.json(
          { success: false, message: "Your cart is empty" },
          { status: 400 }
        );
      }

      // Filter cart items to only the selected ones (if itemIds provided)
      const filteredCartItems = itemIds && Array.isArray(itemIds) && itemIds.length > 0
        ? cart.items.filter((cartItem: any) => {
          const productId = cartItem.product?._id?.toString() || cartItem.product?.toString();
          return itemIds.includes(productId);
        })
        : cart.items;

      if (filteredCartItems.length === 0) {
        return NextResponse.json(
          { success: false, message: "No valid items selected for checkout" },
          { status: 400 }
        );
      }

      // Step 3: Validate stock and build order items from DB data
      for (const cartItem of filteredCartItems) {
        const product = cartItem.product;

        // If populate didn't resolve, fetch manually
        if (!product || !product.name) {
          const fetchedProduct = await Product.findById(cartItem.product);
          if (!fetchedProduct) {
            return NextResponse.json(
              { success: false, message: `Product not found in cart` },
              { status: 404 }
            );
          }

          if (fetchedProduct.quantity < cartItem.quantity) {
            return NextResponse.json(
              {
                success: false,
                message: `Insufficient stock for ${fetchedProduct.name}. Available: ${fetchedProduct.quantity}, Requested: ${cartItem.quantity}`,
              },
              { status: 400 }
            );
          }

          orderItems.push({
            product: fetchedProduct._id.toString(),
            quantity: cartItem.quantity,
            price: fetchedProduct.final_price,
            ...(cartItem.variant && { variant: cartItem.variant }),
            name: fetchedProduct.name,
            discount: fetchedProduct.discount,
            images: fetchedProduct.image,
            vendorId: fetchedProduct.store?.id || "default",
          });
        } else {
          if (product.quantity < cartItem.quantity) {
            return NextResponse.json(
              {
                success: false,
                message: `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${cartItem.quantity}`,
              },
              { status: 400 }
            );
          }

          orderItems.push({
            product: product._id.toString(),
            quantity: cartItem.quantity,
            price: product.final_price, // final_price from DB (post-discount), not from client
            ...(cartItem.variant && { variant: cartItem.variant }),
            name: product.name,
            discount: product.discount,
            images: product.image,
            vendorId: product.store?.id || "default",
          });
        }
      }
    }


    // Step 4: Compute subtotal from DB prices
    const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Step 5: Validate promo code server-side (if provided)
    const productIds = orderItems.map((item) => item.product);
    let promoDiscount = 0;
    let promoDetails: {
      code: string;
      discountType: string;
      discountValue: number;
      maxDiscount: number | null;
    } | null = null;

    if (promoCode) {
      const promoResult = await validateAndCalculatePromo(
        promoCode,
        subtotal,
        decoded.userId,
        productIds
      );
      console.log({ promoResult })
      if (promoResult) {
        promoDiscount = promoResult.discount;
        promoDetails = {
          code: promoResult.code,
          discountType: promoResult.discountType,
          discountValue: promoResult.discountValue,
          maxDiscount: promoResult.maxDiscount,
        };
      }
      // If promo is invalid, we silently ignore it (order proceeds without discount)
    }

    // Step 6: Compute all monetary values server-side
    const deliveryFee = DELIVERY_FEE;
    const taxes = parseFloat(((subtotal - promoDiscount) * TAX_RATE).toFixed(2));
    const totalPrice = parseFloat(
      (subtotal + deliveryFee - promoDiscount + taxes).toFixed(2)
    );

    // Step 7: Generate a unique orderId
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

    // Step 8: Group products by vendor and create SubOrders
    const subOrdersByVendor = new Map<string, any[]>();
    for (const item of orderItems) {
      const vid = item.vendorId || "default";
      if (!subOrdersByVendor.has(vid)) {
        subOrdersByVendor.set(vid, []);
      }
      subOrdersByVendor.get(vid)?.push({
        id: item.product,
        name: item.name,
        quantity: item.quantity,
        discount: item.discount || 0,
        price: item.price,
        images: item.images,
        ...(item.variant && { variant: item.variant }),
      });
    }

    const subOrderIds: string[] = [];
    for (const [vendorId, products] of Array.from(subOrdersByVendor.entries())) {
      const subOrderProducts = products.map((p: any) => {
        // p.price is already final_price (post-discount unit price)
        const finalPrice = p.price * p.quantity;
        return {
          ...p,
          finalPrice: parseFloat(finalPrice.toFixed(2))
        };
      });

      const subtotal = subOrderProducts.reduce((acc: number, p: any) => acc + p.finalPrice, 0);
      const taxes = parseFloat((subtotal * TAX_RATE).toFixed(2));
      const total = parseFloat((subtotal + taxes).toFixed(2));

      const subOrder = new SubOrder({
        orderId: newOrderId,
        userId: decoded.userId,
        vendorId,
        products: subOrderProducts,
        status: "pending",
        taxes,
        subtotal,
        total
      });
      await subOrder.save();
      subOrderIds.push(subOrder._id.toString());
    }

    // Step 9: Create the main order with subOrderIds
    const order = new Order({
      user: decoded.userId,
      subOrderIds,
      deliveryAddress: {
        full_name: deliveryAddress.full_name,
        street: deliveryAddress.street,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        zip: deliveryAddress.zip,
        country: deliveryAddress.country,
      },
      subtotal,
      deliveryFee,
      ...(promoDetails && {
        promoCode: {
          code: promoDetails.code,
          discountType: promoDetails.discountType,
          discountValue: promoDetails.discountValue,
          maxDiscount: promoDetails.maxDiscount,
        },
      }),
      promoDiscount,
      taxes,
      totalPrice,
      paymentMethod,
      paymentStatus: "unpaid",
      status: "pending",
      orderId: newOrderId,
    });
    console.log({ order })
    await order.save();

    // Step 10: Record promo usage
    if (promoDiscount > 0 && promoDetails) {
      await Promo.findOneAndUpdate(
        { code: promoDetails.code },
        {
          $inc: { usageCount: 1 },
          $push: {
            usedBy: {
              userId: decoded.userId,
              orderId: order.orderId,
              usedAt: new Date(),
            },
          },
        }
      );
    }

    if (paymentMethod === "COD") {
      // Decrease stock for COD orders immediately
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { quantity: -item.quantity },
        });
      }

      if (!isDirectBuy) {
        // Remove only the ordered items from the cart (not the entire cart)
        const orderedProductIds = orderItems.map((item) => item.product);
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

      // Send order confirmation email (fire-and-forget — does not block response)
      const appUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
      sendOrderConfirmationEmail(user.email, {
        orderId: newOrderId,
        orderDetailsUrl: `${appUrl}/account/orders/${order._id}`,
        customerName: user.name || deliveryAddress.full_name,
        items: orderItems.map((item) => ({
          name: item.name || "Product",
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        deliveryFee,
        promoDiscount,
        taxes,
        totalPrice,
        paymentMethod,
        deliveryAddress: {
          full_name: deliveryAddress.full_name,
          street: deliveryAddress.street,
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          zip: deliveryAddress.zip,
          country: deliveryAddress.country,
        },
      }).catch((err) =>
        console.error("Failed to send order confirmation email:", err)
      );

      return NextResponse.json({
        success: true,
        message: "Order placed successfully",
        orderId: order._id,
      });
    } else if (paymentMethod === "STRIPE") {
      // Build Stripe line items from DB product data
      const populatedOrderItems = await Promise.all(
        orderItems.map(async (item) => {
          const product = await Product.findById(item.product);
          return { ...item, productName: product?.name || `Product` };
        })
      );

      const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

      const stripeLineItems = populatedOrderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productName,
          },
          unit_amount: Math.round(item.price * 100), // item.price is final_price (post-discount), Stripe expects cents
        },
        quantity: item.quantity,
      }));

      if (deliveryFee > 0) {
        stripeLineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Delivery Fee",
            },
            unit_amount: Math.round(deliveryFee * 100),
          },
          quantity: 1,
        });
      }

      if (taxes > 0) {
        stripeLineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tax",
            },
            unit_amount: Math.round(taxes * 100),
          },
          quantity: 1,
        });
      }

      let stripeDiscounts = undefined;
      if (promoDiscount > 0) {
        const coupon = await stripe.coupons.create({
          amount_off: Math.round(promoDiscount * 100),
          currency: "usd",
          duration: "once",
          name: promoDetails?.code || "Discount",
        });
        stripeDiscounts = [{ coupon: coupon.id }];
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        client_reference_id: order._id.toString(),
        metadata: {
          orderId: order._id.toString(),
          userId: decoded.userId.toString(),
          isDirectBuy: isDirectBuy ? "true" : "false",
        },
        line_items: stripeLineItems,
        ...(stripeDiscounts && { discounts: stripeDiscounts }),
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

  } catch (error: unknown) {
    console.error("Error creating order:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
