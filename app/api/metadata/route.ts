import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Metadata from "@/models/Metadata";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectToDatabase();
    const metadata = await Metadata.findOne().lean();
    const categories = await Category.find().limit(4).lean();

    if (!metadata) {
      return NextResponse.json(
        { success: false, message: "Metadata not found" },
        { status: 404 }
      );
    }
    const metadataWithCategories = { ...metadata, categories: categories || [] }
    return NextResponse.json(metadataWithCategories);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
