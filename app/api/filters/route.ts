import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get accurate dynamic counts directly from the Products collection
    const categoryCounts = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const countMap = categoryCounts.reduce((acc: any, curr: any) => {
      // Normalize category ID for case-insensitive matching
      const key = curr._id ? curr._id.toLowerCase() : "";
      acc[key] = curr.count;
      return acc;
    }, {});
    
    // Get Categories array
    const categories = await Category.find().select("name slug count");
    
    // Get max price from products
    const maxPriceProduct = await Product.findOne().sort({ price: -1 }).select("price");
    const maxPrice = maxPriceProduct?.price || 1000;

    const filters = {
      categories: categories.map((cat: any) => {
        const slugLower = cat.slug.toLowerCase();
        const nameLower = cat.name.toLowerCase();
        // Check both slug and name against the products' raw category strings
        const accurateCount = countMap[slugLower] || countMap[nameLower] || 0;
        
        return {
          name: cat.name,
          slug: cat.slug,
          count: accurateCount,
        };
      }),
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
