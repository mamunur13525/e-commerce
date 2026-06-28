import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const categories = await Category.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
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
    const { type, name, subtitle, color, icon, slug, count } = body;

    if (!type || !name || !subtitle || !color || !icon) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: type, name, subtitle, color, icon",
        },
        { status: 400 }
      );
    }

    const category = await Category.create({
      type,
      name,
      subtitle,
      color,
      icon,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      count: count !== undefined ? Number(count) : 0,
    });

    return NextResponse.json(
      { success: true, data: category, message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
