
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        await connectToDatabase();

        // Check if products already exist
        const count = await Product.countDocuments();
        if (count > 0) {
            return NextResponse.json({
                success: true,
                message: "Products already seeded",
            });
        }

        const filePath = path.join(process.cwd(), "products.json");
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const products = JSON.parse(jsonData);

        await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: "Products seeded successfully",
            count: products.length,
        });
    } catch (error) {
        console.error("Error seeding products:", error);
        return NextResponse.json(
            { success: false, message: "Error seeding products" },
            { status: 500 }
        );
    }
}
