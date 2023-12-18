import { connectMongoDB } from "../../../lib/mongodb"
import Product from "../../../models/product"
import User from "../../../models/user"

export default async function POST(req, res) {
    const {category, offset, limit = 10} = req.body

    await connectMongoDB()

    const products = await Product.find().sort({updatedAt:-1})
    const categoryProducts = products.filter(product => product.category === category)
    const extraProducts = products.filter(product => product.category !== category)
    const allProducts = [...categoryProducts, ...extraProducts]
    const filteredProducts = allProducts.slice(offset, offset + limit)
    let allLoaded = false
    if(filteredProducts.length < 10) {
        allLoaded = true
    }
    else {
        allLoaded = false
    }

    res.send({data: filteredProducts, allLoaded})
}