import { connectMongoDB } from "../../../lib/mongodb"
import Order from "../../../models/order"
import User from "../../../models/user"

export default async function POST(req, res) {
    const body = req.body
    

    await connectMongoDB()
    const user = await User.findOne({email: body.user_details.email})
    const newUserData = {...user}
    if(newUserData._doc.orders[0]) {
        newUserData._doc.orders = [...user.orders, body]
    }
    else {
        newUserData._doc.orders = [body]
    }


    await User.findOneAndUpdate({email: body.user_details.email}, {orders: newUserData._doc.orders})
    const response = await Order.create(body)
    if(response) {
        res.send({status: 'success'})
    }
}