import { connectMongoDB } from "../../../lib/mongodb"
import Order from "../../../models/order"
import User from "../../../models/user"

export default async function POST(req, res) {
    const body = req.body
    

    await connectMongoDB()
    const response = await Order.create(body)

    const user = await User.findOne({email: body.user_details.email})
    const orderID = response._id.toString()
    const newUserData = {...user._doc}
    if(newUserData.orders[0]) {
        newUserData.orders = [...user.orders, orderID]
    }
    else {
        newUserData.orders = [orderID]
    }

    

    const userResponse = await User.findOneAndUpdate({email: body.user_details.email}, {orders: newUserData.orders})
    if(userResponse) {
        res.send({status: 'success'})
    }
}