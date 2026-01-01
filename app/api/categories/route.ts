import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { success: false, message: "No categories found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
