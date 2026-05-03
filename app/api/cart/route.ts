import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

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

    // Find the cart and populate product details
    const cart = await Cart.findOne({ user: decoded.userId, status: "active" })
      .populate({
        path: "items.product",
        model: Product
      })
      .lean();

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Format the response to match the existing frontend expectations if possible
    // The previous format was: [{ productId: "123", quantity: 1, product: { ... } }]
    const formattedCart = cart.items.map((item: any) => ({
      productId: item.product?._id || item.product,
      quantity: item.quantity,
      price: item.price,
      product: item.product
    }));

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
console.log({productId, quantity})
    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
       return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({ user: decoded.userId, status: "active" });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: decoded.userId,
        items: [{ product: productId, quantity, price: product.price }],
      });
    } else {
      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
      }
    }

    await cart.save();
    
    // Populate to return the updated format
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

    let cart = await Cart.findOne({ user: decoded.userId, status: "active" });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    if (quantity <= 0) {
      // Remove item
      cart.items = cart.items.filter(
        (item: any) => item.product.toString() !== productId
      );
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        // Technically this shouldn't happen on PUT to existing item, but to be safe:
        const product = await Product.findById(productId);
        if (product) {
            cart.items.push({ product: productId, quantity, price: product.price });
        }
      }
    }

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

    let cart = await Cart.findOne({ user: decoded.userId, status: "active" });
    if (!cart) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "Cart already empty",
      });
    }

    // Clear entire cart by emptying items
    cart.items = [];
    await cart.save();

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
