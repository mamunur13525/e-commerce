import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import Product from "@/models/Product";
import Vendor from "@/models/Vendor";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id: productId } = await params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch comments and populate user
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query = { product: productId, parentId: null };
    const total = await Comment.countDocuments(query);
    
    const mainComments = await Comment.find(query)
      .populate({
        path: "user",
        model: User,
        select: "first_name last_name image",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const mainCommentIds = mainComments.map(c => c._id);
    const replies = await Comment.find({ parentId: { $in: mainCommentIds } })
      .populate({
        path: "user",
        model: User,
        select: "first_name last_name image",
      })
      .sort({ createdAt: 1 });

    const allComments = [...mainComments, ...replies];

    return NextResponse.json({
      success: true,
      data: allComments,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id: productId } = await params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { text, parentId } = await request.json();

    if (!text) {
      return NextResponse.json(
        { success: false, message: "Comment text is required" },
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

    // Check if user is the vendor of this product
    const vendor = await Vendor.findOne({ userId: decoded.userId });
    const isVendor = vendor && vendor.vendorId === product.store.id;

    const comment = new Comment({
      product: productId,
      user: decoded.userId,
      text,
      parentId: parentId || null,
      isVendor: !!isVendor,
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate({
      path: "user",
      model: User,
      select: "first_name last_name image",
    });

    return NextResponse.json({
      success: true,
      data: populatedComment,
      message: "Comment submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
