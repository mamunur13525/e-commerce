import { connectMongoDB } from "../../../lib/mongodb"
import Order from "../../../models/order"
import User from "../../../models/user"

export default async function POST(req, res) {
    const body = req.body
    

    await connectMongoDB()

    const orders = await Order.find({_id: { $in: body }}).sort({createdAt:-1})
    

    if(orders) {
        res.send(orders)
    }
}