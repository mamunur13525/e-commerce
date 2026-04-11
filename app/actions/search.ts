"use server";

import { getCurrencySymbol } from "@/lib/currency";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Vendor from "@/models/Vendor";

export type SearchResult = {
  suggestions: { label: string; bold: string }[];
  stores: { id: string; name: string }[];
  products: { name: string; price: string; image: string; id: string }[];
};

export async function searchSite(query: string): Promise<SearchResult> {
  if (!query || query.trim() === "") {
    return { suggestions: [], stores: [], products: [] };
  }

  await connectToDatabase();

  const lowerQuery = query.toLowerCase();

  const [products, vendors] = await Promise.all([
    Product.find({
      $or: [
        { name: { $regex: lowerQuery, $options: "i" } },
        { category: { $regex: lowerQuery, $options: "i" } },
      ],
    }).limit(10),
    Vendor.find({
      storeName: { $regex: lowerQuery, $options: "i" },
      vendorStatus: "active",
    }).limit(5),
  ]);

  const categorySet = new Set<string>();
  products.forEach((p) => categorySet.add(p.category));
  const categories = Array.from(categorySet);

  const suggestions: { label: string; bold: string }[] = [];
  categories.forEach((cat) => {
    if (cat.toLowerCase().includes(lowerQuery)) {
      suggestions.push({ label: cat, bold: cat.split(" ")[0] });
    } else {
      suggestions.push({ label: cat, bold: "All" });
    }
  });

  const stores = vendors.map((v) => ({
    id: v._id.toString(),
    name: v.storeName,
  }));

  const formattedProducts = products.map((p) => ({
    name: p.name,
    price: getCurrencySymbol(p.currency) + ` ${p.final_price}`,
    image: p.image?.url || "/placeholder-image.png",
    id: p._id.toString(),
  }));

  return {
    suggestions: suggestions.slice(0, 7),
    stores,
    products: formattedProducts,
  };
}

export type PopularSearch = {
  name: string;
  price: string;
  image: string;
  id: string;
};

export async function getPopularSearches(): Promise<PopularSearch[]> {
  await connectToDatabase();

  const products = await Product.find().sort({ rating: -1 }).limit(6).lean();
  return products.map((p) => ({
    name: p.name,
    price: getCurrencySymbol(p.currency) + ` ${p.final_price}`,
    image: p.image?.url || "/placeholder-image.png",
    id: p._id.toString(),
  }));
}

export async function getCategories(): Promise<string[]> {
  await connectToDatabase();
  const categories = await Product.distinct("category");
  console.log({categories})
  return categories as string[];
}

export type CategoryInfo = {
  name: string;
  slug: string;
  subtitle: string;
  color: string;
  icon: string;
  count: number;
};

export async function getCategoryInfo(): Promise<CategoryInfo[]> {
  await connectToDatabase();
  
  const categoryCounts = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);
  
  const countMap: Record<string, number> = {};
  categoryCounts.forEach((c) => {
    if (c._id) countMap[c._id.toString().toLowerCase()] = c.count;
  });
  
  const categories = await Category.find();
  
  return categories.map((cat) => ({
    name: cat.name,
    slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
    subtitle: cat.subtitle || "",
    color: cat.color || "#f3f4f6",
    icon: cat.icon || "🌿",
    count: countMap[cat.name.toLowerCase()] || 0,
  }));
}
