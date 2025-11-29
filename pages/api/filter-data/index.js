import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { offset = 0, limit = 10, searchFilter = false, search = '', price, rate, cat = ['fruits', 'vegetables', 'nuts'] } = req.body;

    try {
        await connectMongoDB();

        const [maxPriceDoc] = await Product.find().sort({ price: -1 }).limit(1).select('price').lean();
        const maxPrice = maxPriceDoc?.price || 100000;
        const filterPrice = price || maxPrice;

        let query, result;

        if (searchFilter && search) {
            query = Product.find({ name: { $regex: search, $options: 'i' } });
        } else {
            query = Product.find({
                price: { $lte: filterPrice },
                ...(rate && { rating: { $lte: rate } }),
                category: { $in: cat }
            });
        }

        result = await query
            .sort({ updatedAt: -1 })
            .skip(offset)
            .limit(limit)
            .lean();

        const allLoaded = result.length < limit;
        const message = result.length === 0
            ? (searchFilter ? `No products found for "${search}"` : 'No products match your filters')
            : null;

        return res.status(200).json({
            status: 'success',
            data: result,
            allLoaded,
            maxPrice,
            message
        });
    } catch (error) {
        console.error('Filter API Error:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

