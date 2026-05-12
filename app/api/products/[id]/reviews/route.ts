import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";
import SubOrder from "@/models/SubOrder";
import Product from "@/models/Product";
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
    const { searchParams } = new URL(request.url);
    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort") || "recent";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: any = { product: productId };
    if (rating && rating !== "all") {
      query.rating = parseInt(rating);
    }

    let sortOptions: any = { createdAt: -1 };
    if (sort === "recent") {
      sortOptions = { createdAt: -1 };
    } else if (sort === "rating-desc") {
      sortOptions = { rating: -1, createdAt: -1 };
    } else if (sort === "rating-asc") {
      sortOptions = { rating: 1, createdAt: -1 };
    } else if (sort === "relevance") {
      sortOptions = { createdAt: -1 };
    }

    const total = await Review.countDocuments(query);
    const reviews = await Review.find(query)
      .populate({
        path: "user",
        model: User,
        select: "first_name last_name image",
      })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
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

    const { rating, comment, images } = await request.json();

    if (!rating || !comment) {
      return NextResponse.json(
        { success: false, message: "Rating and comment are required" },
        { status: 400 }
      );
    }

    // Verify if product is purchased and delivered
    const deliveredOrder = await SubOrder.findOne({
      userId: decoded.userId,
      "products.id": productId,
      status: "delivered",
    });

    if (!deliveredOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only review products you have purchased and received.",
        },
        { status: 403 }
      );
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({
      product: productId,
      user: decoded.userId,
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You have already reviewed this product." },
        { status: 400 }
      );
    }

    const review = new Review({
      product: productId,
      user: decoded.userId,
      order: deliveredOrder._id,
      rating,
      comment,
      images,
    });

    await review.save();

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const avgRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, { rating: avgRating });

    return NextResponse.json({
      success: true,
      data: review,
      message: "Review submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
