import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Metadata from "@/models/Metadata";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();

    const metadata = await Metadata.findOne().lean();

    if (!metadata) {
      return NextResponse.json(
        { success: false, message: "Metadata not found" },
        { status: 404 }
      );
    }

    // Only return categories that have at least one product
    const categoriesWithProducts = await Product.distinct("category");
    const categories = await Category.find({
      name: { $in: categoriesWithProducts },
    }).lean();

    const metadataWithCategories = { ...metadata, categories: categories || [] };
    return NextResponse.json(metadataWithCategories);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

