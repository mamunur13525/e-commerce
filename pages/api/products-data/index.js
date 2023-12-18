import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { offset = 0, limit = 10, category = 'All' } = req.body

    await connectMongoDB()

    let maxPrice = 0
    Product.find()
    .sort({base_price:-1})
    .limit(1)
    .then(maxPriceResult => {
        maxPrice = maxPriceResult[0].base_price

        if(category !== 'All') {
            Product.find({'category': category})
            .sort({updatedAt:-1})
            .skip(offset)
            .limit(limit)
            .then(result => {
                let allLoaded = false
                if(result.length < 10) {
                    allLoaded = true
                }
                else {
                    allLoaded = false
                }
                // const categoryData = category === 'All' ? [...result] : result.filter(product => product.category === category)
                res.send({status: 'success', data: result, allLoaded: allLoaded, maxPrice})
            })
        }
        else {
            Product.find()
            .sort({updatedAt:-1})
            .skip(offset)
            .limit(limit)
            .then(result => {
                let allLoaded = false
                if(result.length < 10) {
                    allLoaded = true
                }
                else {
                    allLoaded = false
                }
                res.send({status: 'success', data: result, allLoaded: allLoaded, maxPrice})
            })
        }
    })
}