import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { searchValue } = req.body
    console.log(searchValue)

    await connectMongoDB()
    Product.find()
    .then(result => {
        const searchedData = result.filter(product => product.item_name.toLowerCase().includes(searchValue.toLowerCase()))
        res.send(searchedData)
    })
}