import { connectMongoDB } from "../../../lib/mongodb"
import Product from "../../../models/product"

export default async function POST(req, res) {

    await connectMongoDB()
    const response = await Product.create(req.body)
    return res.send(response)
}