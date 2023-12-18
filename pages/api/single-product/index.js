import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { productId } = req.body

    await connectMongoDB()
    Product.findOne({_id: productId})
    .then(result => {
        res.send(result)
    })
}