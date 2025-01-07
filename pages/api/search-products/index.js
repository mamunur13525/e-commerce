import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { searchValue } = req.body;

    // Ensure searchValue is provided and is a string
    if (!searchValue || typeof searchValue !== "string") {
        return res.status(400).json({ message: "Invalid or missing search value" });
    }

    await connectMongoDB();

    try {
        // Search products with a case-insensitive regex
        const searchedData = await Product.find({
            name: { $regex: searchValue, $options: "i" },
        });

        return res.status(200).json(searchedData);
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}