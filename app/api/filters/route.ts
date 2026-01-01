import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    
    const categories = await Category.find().select("name slug count");
    
    // Get max price from products
    const maxPriceProduct = await Product.findOne().sort({ price: -1 }).select("price");
    const maxPrice = maxPriceProduct?.price || 1000;

    const filters = {
      categories: categories.map((cat: any) => ({
        name: cat.name,
        slug: cat.slug,
        count: cat.count || 0,
      })),
      maxPrice,
    };

    return NextResponse.json(filters);
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
