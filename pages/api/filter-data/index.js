import { connectMongoDB } from "../../../lib/mongodb";
import Product from "../../../models/product";

export default async function POST(req, res) {
    const { offset = 0, limit = 10, search = false, searchValue = '', filterPrice, filterRating, filterCategory } = req.body

    await connectMongoDB()

    let newFilterPrice = filterPrice
    let maxPrice = 0
    try {
        Product.find()
        .sort({base_price:-1})
        .limit(1)
        .then(maxPriceResult => {
            maxPrice = maxPriceResult[0].base_price
            if(filterPrice === 0) {
                newFilterPrice = maxPrice
            }

            if(search) {
                Product.find({item_name: { $regex: searchValue, $options: 'i' }})
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
                    return res.send({status: 'success', data: result, allLoaded: allLoaded, maxPrice})
                })
            }
            else {
                Product.find({"base_price":{"$lte":newFilterPrice}, "rating":{"$lte":filterRating}, 'category': { $in: filterCategory }})
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
                    return res.send({status: 'success', data: result, allLoaded: allLoaded, maxPrice})
                })
            }
        })
    } catch (error) {
        return res.send({message: error || 'Internal server error'})
    }
}


