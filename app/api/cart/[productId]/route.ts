import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
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

    let cart = await Cart.findOne({ user: decoded.userId, status: "active" });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    // Remove specific item from cart
    cart.items = cart.items.filter(
      (item: any) => item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.product",
      model: Product
    });

    const formattedCart = cart.items.map((item: any) => ({
      productId: item.product?._id || item.product,
      quantity: item.quantity,
      price: item.price,
      product: item.product
    }));

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
