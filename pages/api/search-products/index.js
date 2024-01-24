import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { searchValue } = req.body

    await connectMongoDB()
    try {
        Product.find()
        .then(result => {
            const searchedData = result.filter(product => product.item_name.toLowerCase().includes(searchValue.toLowerCase()))
            return res.send(searchedData)
        })
        return res.send({error: 'Internal server error'})
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}