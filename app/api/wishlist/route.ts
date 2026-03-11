import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import connectDB from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product"; // needed for population

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

    let wishlist = await Wishlist.findOne({ user: decoded.userId }).populate({
      path: "products",
      model: Product,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: decoded.userId, products: [] });
    }

    return NextResponse.json({
      success: true,
      data: wishlist.products,
    });
  } catch (error: any) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
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

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
        return NextResponse.json(
            { success: false, message: "Product not found" },
            { status: 404 }
          );
    }

    let wishlist = await Wishlist.findOne({ user: decoded.userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: decoded.userId,
        products: [productId],
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    // populate before returning
    await wishlist.populate({
        path: "products",
        model: Product,
    });

    return NextResponse.json({
      success: true,
      data: wishlist.products,
      message: "Added to wishlist"
    });
  } catch (error: any) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
