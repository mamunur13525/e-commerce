import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import Promo from "@/models/Promo";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { sendOrderConfirmationEmail } from "@/lib/mail";

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
  userId: string | null,
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

  // Check if user already used this promo code (only for authenticated users)
  if (userId) {
    const alreadyUsed = promo.usedBy?.some((usage: any) => usage.userId === userId);
    if (alreadyUsed) return null;
  }

  // Check minimum order amount
  if (subtotal < promo.minOrderAmount) return null;

  // Check first order restriction (only for authenticated users)
  if (promo.applicableToFirstOrder) {
    if (userId) {
      const existingOrders = await Order.countDocuments({ user: userId });
      if (existingOrders > 0) return null;
    }
    // For guest users, we can't check first order, so we allow it
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

    // Verify authentication (optional - guest users can also order)
    const token = request.headers.get("authorization")?.split(" ")[1];
    let userId: string | null = null;

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    // Only accept identifiers and choices from the client
    const body = await request.json();
    const { addressId, paymentMethod, promoCode, itemIds, buyNowProductId, buyNowQuantity, guestInfo, guestAddress } = body;

    // Validate required fields
    if (!paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Missing required field: paymentMethod" },
        { status: 400 }
      );
    }

    if (paymentMethod !== "COD") {
      return NextResponse.json(
        { success: false, message: "Only Cash on Delivery payment is allowed" },
        { status: 400 }
      );
    }

    // Validate guest info if not authenticated
    if (!userId) {
      if (!guestInfo || !guestInfo.name || !guestInfo.email || !guestInfo.phone) {
        return NextResponse.json(
          { success: false, message: "Guest name, email, and phone are required" },
          { status: 400 }
        );
      }
      if (!guestAddress || !guestAddress.full_name || !guestAddress.street || !guestAddress.city || !guestAddress.state || !guestAddress.zip) {
        return NextResponse.json(
          { success: false, message: "Delivery address fields are required for guest checkout" },
          { status: 400 }
        );
      }
    }

    // Step 1: Resolve delivery address
    let deliveryAddressData: {
      full_name: string;
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };

    if (userId) {
      // Authenticated user: fetch address from DB
      if (!addressId) {
        return NextResponse.json(
          { success: false, message: "Missing required field: addressId" },
          { status: 400 }
        );
      }

      const user = await User.findById(userId);
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

      deliveryAddressData = {
        full_name: deliveryAddress.full_name,
        street: deliveryAddress.street,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        zip: deliveryAddress.zip,
        country: deliveryAddress.country,
      };
    } else {
      // Guest user: use address from request body
      deliveryAddressData = {
        full_name: guestAddress.full_name,
        street: guestAddress.street,
        city: guestAddress.city,
        state: guestAddress.state,
        zip: guestAddress.zip,
        country: guestAddress.country || "Bangladesh",
      };
    }

    const orderItems: {
      product: string;
      quantity: number;
      price: number;
      variant?: string;
      name?: string;
      discount?: number;
      images?: any;
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
      });
    } else {
      // Authenticated user: fetch cart from DB
      if (!userId) {
        return NextResponse.json(
          { success: false, message: "Please log in to order from your cart. For guest checkout, use direct purchase." },
          { status: 400 }
        );
      }

      // Step 2: Fetch user's active cart with populated product data
      const cart = await Cart.findOne({
        user: userId,
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
        userId,
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

    // Step 8: Create the main order with items directly
    const orderData: Record<string, unknown> = {
      ...(userId ? { user: userId } : {}),
      ...(guestInfo ? {
        guestInfo: {
          name: guestInfo.name,
          email: guestInfo.email,
          phone: guestInfo.phone,
        }
      } : {}),
      items: orderItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        ...(item.variant && { variant: item.variant }),
      })),
      deliveryAddress: deliveryAddressData,
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
    };

    const order = new Order(orderData);
    console.log({ order })
    await order.save();

    // Step 10: Record promo usage (only for authenticated users)
    if (promoDiscount > 0 && promoDetails && userId) {
      await Promo.findOneAndUpdate(
        { code: promoDetails.code },
        {
          $inc: { usageCount: 1 },
          $push: {
            usedBy: {
              userId: userId,
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

      // Remove ordered items from cart only for authenticated users
      if (userId && !isDirectBuy) {
        const orderedProductIds = orderItems.map((item) => item.product);
        await Cart.findOneAndUpdate(
          { user: userId, status: "active" },
          { $pull: { items: { product: { $in: orderedProductIds } } } }
        );
        // Recalculate cart totals
        const updatedCart = await Cart.findOne({ user: userId, status: "active" });
        if (updatedCart) {
          await updatedCart.save();
        }
      }

      // Send order confirmation email if we have an email address
      const customerEmail = userId
        ? (await User.findById(userId))?.email
        : guestInfo?.email;

      if (customerEmail) {
        const appUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        const userInfo = userId ? await User.findById(userId) : null;
        sendOrderConfirmationEmail(customerEmail, {
          orderId: newOrderId,
          orderDetailsUrl: `${appUrl}/account/orders/${order._id}`,
          customerName: userInfo?.name || deliveryAddressData.full_name,
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
          deliveryAddress: deliveryAddressData,
        }).catch((err) =>
          console.error("Failed to send order confirmation email:", err)
        );
      }

      return NextResponse.json({
        success: true,
        message: "Order placed successfully",
        orderId: order._id,
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