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

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Transform cart array to include quantity
    const cartItems = user.cart || [];
    const formattedCart = await formatCartWithProducts(cartItems);

    return NextResponse.json({
      success: true,
      data: formattedCart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if product already in cart
    const existingItemIndex = user.cart.findIndex((item: Record<string, unknown>) =>
      typeof item === "string"
        ? item === productId
        : item.productId === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      if (typeof user.cart[existingItemIndex] === "string") {
        user.cart[existingItemIndex] = { productId, quantity };
      } else {
        user.cart[existingItemIndex].quantity += quantity;
      }
    } else {
      // Add new item
      user.cart.push({ productId, quantity });
    }

    await user.save();

    // Format response with product details
    const formattedCart = await formatCartWithProducts(user.cart);

    return NextResponse.json({
      success: true,
      data: formattedCart,
      message: "Item added to cart",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const { productId, quantity } = await request.json();

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, message: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Update or remove item
    if (quantity <= 0) {
      user.cart = user.cart.filter((item: Record<string, unknown>) =>
        typeof item === "string"
          ? item !== productId
          : item.productId !== productId
      );
    } else {
      const itemIndex = user.cart.findIndex((item: Record<string, unknown>) =>
        typeof item === "string"
          ? item === productId
          : item.productId === productId
      );

      if (itemIndex > -1) {
        user.cart[itemIndex] = { productId, quantity };
      } else {
        user.cart.push({ productId, quantity });
      }
    }

    await user.save();

    const formattedCart = await formatCartWithProducts(user.cart);

    return NextResponse.json({
      success: true,
      data: formattedCart,
      message: "Cart updated",
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const token = request.headers.get("authorization")?.split(" ")[1];
    console.log({token})
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

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Clear entire cart
    user.cart = [];
    await user.save();

    return NextResponse.json({
      success: true,
      data: [],
      message: "Cart cleared",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
