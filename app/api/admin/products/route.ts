import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, description, price, final_price, quantity, weight, rating, category, discount, currency, image, images, sizes, colors } = body;

    // Validation
    if (!name || !description || !price || !quantity || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, description, price, quantity, category" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      final_price: final_price !== undefined ? Number(final_price) : Number(price),
      quantity: Number(quantity),
      weight: weight || "",
      rating: rating !== undefined ? Number(rating) : 0,
      category,
      discount: discount !== undefined ? Number(discount) : 0,
      currency: currency || "USD",
      image: image || {},
      images: images || [],
      sizes: sizes || undefined,
      colors: colors || undefined,
    });

    return NextResponse.json(
      { success: true, data: product, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}