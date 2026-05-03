import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import connectDB from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product"; // needed for population

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;

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

    const wishlist = await Wishlist.findOne({ user: decoded.userId });

    if (!wishlist) {
      return NextResponse.json(
        { success: false, message: "Wishlist not found" },
        { status: 404 }
      );
    }

    // Remove the product ID from the array
    wishlist.products = wishlist.products.filter(
      (id: any) => id.toString() !== productId
    );
    await wishlist.save();

     // populate before returning
     await wishlist.populate({
        path: "products",
        model: Product,
    });

    return NextResponse.json({
      success: true,
      message: "Removed from wishlist",
      data: wishlist.products,
    });
  } catch (error: any) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
