import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { offset = 0, limit = 10, category = 'all' } = req.body
    console.log(req.body)

    await connectMongoDB()

    let maxPrice = 0
    try {
        Product.find()
        .sort({price:-1})
        .limit(1)
        .then(maxPriceResult => {
            maxPrice = maxPriceResult[0].price

            if(category !== 'all') {
                Product.find({'category': category})
                .sort({updatedAt:-1})
                .skip(offset)
                .limit(limit)
                .then(result => {
                    let allLoaded = false
                    if(result.length < limit) {
                        allLoaded = true
                    }
                    else {
                        allLoaded = false
                    }
                    // const categoryData = category === 'all' ? [...result] : result.filter(product => product.category === category)
                    return res.send({status: 'success', data: result, allLoaded: allLoaded, maxPrice})
                })
            }
            else {
                Product.find()
                .sort({updatedAt:-1})
                .skip(offset)
                .limit(limit)
                .then(result => {
                    let allLoaded = false
                    if(result.length < limit) {
                        allLoaded = true
                    }
                    else {
                        allLoaded = false
                    }
                    return res.send({status: 'success', data: result, allLoaded: allLoaded, maxPrice})
                })
            }
        })
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}