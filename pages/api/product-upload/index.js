import { connectMongoDB } from "../../../lib/mongodb"
import Product from "../../../models/product"

export default async function POST(req, res) {

    await connectMongoDB()
    try {
        const response = await Product.create(req.body)
        return res.send(response)
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}