import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { offset = 0, limit = 10, searchFilter = false, search = '', price = 100000, rate = 5, cat = ['fruits', 'vegetables', 'nuts'] } = req.body
    console.log(req.body, 'server')

    await connectMongoDB()

    let newFilterPrice = price
    let maxPrice = 0
    try {
        Product.find()
            .sort({ price: -1 })
            .limit(1)
            .then(maxPriceResult => {
                maxPrice = maxPriceResult[0].price
                if (price === 0) {
                    newFilterPrice = maxPrice
                }

                if (searchFilter) {
                    Product.find({ name: { $regex: search, $options: 'i' } })
                        .sort({ updatedAt: -1 })
                        .skip(offset)
                        .limit(limit)
                        .then(result => {
                            let allLoaded = false
                            if (result.length < 10) {
                                allLoaded = true
                            }
                            else {
                                allLoaded = false
                            }
                            return res.send({ status: 'success', data: result, allLoaded: allLoaded, maxPrice, message: result[0] ? null : `There is no product with the keywod '${search}'` })
                        })
                }
                else {
                    Product.find({ "price": { "$lte": newFilterPrice }, "rating": { "$lte": rate }, 'category': { $in: cat } })
                        .sort({ updatedAt: -1 })
                        .skip(offset)
                        .limit(limit)
                        .then(result => {
                            let allLoaded = false
                            if (result.length < 10) {
                                allLoaded = true
                            }
                            else {
                                allLoaded = false
                            }
                            return res.send({ status: 'success', data: result, allLoaded: allLoaded, maxPrice, message: result[0] ? null : `No product found` })
                        })
                }
            })
    } catch (error) {
        return res.send({ message: error || 'Internal server error' })
    }
}


