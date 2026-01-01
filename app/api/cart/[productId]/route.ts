import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

async function formatCartWithProducts(
  cartItems: Record<string, unknown>[]
) {
  const formattedCart = [];

  for (const item of cartItems) {
    let cartItem: Record<string, unknown> = {};

    if (typeof item === "string") {
      cartItem = { productId: item, quantity: 1 };
    } else {
      cartItem = item;
    }

    const productId = cartItem.productId;
    let product = null;

    try {
      product = await Product.findById(productId).lean();
    } catch {
      // Product not found, continue without it
    }

    formattedCart.push({
      productId,
      quantity: cartItem.quantity || 1,
      ...(product && { product }),
    });
  }

  return formattedCart;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
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

    const { productId } = await params;

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Remove specific item from cart
    user.cart = user.cart.filter((item: Record<string, unknown>) =>
      typeof item === "string"
        ? item !== productId
        : item.productId !== productId
    );

    await user.save();

    const formattedCart = await formatCartWithProducts(user.cart);

    return NextResponse.json({
      success: true,
      data: formattedCart,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
