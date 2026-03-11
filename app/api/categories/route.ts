import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";

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

    // Get accurate dynamic counts directly from the Products collection
    const categoryCounts = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const countMap = categoryCounts.reduce((acc: any, curr: any) => {
      const key = curr._id ? curr._id.toLowerCase() : "";
      acc[key] = curr.count;
      return acc;
    }, {});

    const enrichedCategories = categories.map((cat: any) => {
      const slugLower = cat.slug.toLowerCase();
      const nameLower = cat.name.toLowerCase();
      const accurateCount = countMap[slugLower] || countMap[nameLower] || 0;
      
      const catObj = typeof cat.toObject === 'function' ? cat.toObject() : cat;

      return {
        ...catObj,
        count: accurateCount,
      };
    });

    return NextResponse.json(enrichedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
