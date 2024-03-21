import Stripe from "stripe";
import { connectMongoDB } from "../../../lib/mongodb";
import Order from "../../../models/order";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function POST(req, res) {
    const body = JSON.parse(req.body);

    try {
        await connectMongoDB()
        const order = await Order.findOne({order_id: body.id})
        if(order?.stripe_id) {
            if(order?.payment_status === 'paid') {
                return res.status(200).json({payment_status: 'paid'})
            } else {
                const session = await stripe.checkout.sessions.retrieve(order.stripe_id);
                if(session?.payment_status) {
                    if(session?.payment_status === 'paid') {
                        const newOrder = await Order.findOneAndUpdate({order_id: body.id}, {$set: {payment_status: session.payment_status || 'paid', payment_url: null}}, {new: true})
                        return res.status(200).json({payment_status: newOrder.payment_status})
                    } else {
                        return res.status(200).json({payment_status: session.payment_status, pay_url: session.url})
                    }
                } else {
                    return res.status(404).json({error: 'Something went wrong'})
                }
            }
        } else {
            return res.status(404).json({error: 'Something went wrong'})
        }
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}