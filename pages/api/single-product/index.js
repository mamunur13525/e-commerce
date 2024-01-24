import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { productId } = req.body

    await connectMongoDB()
    try {
        Product.findOne({_id: productId})
        .then(result => {
            return res.send(result)
        })
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}