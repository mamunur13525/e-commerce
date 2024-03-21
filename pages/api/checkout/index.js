// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function POST(req, res) {
    const items = req.body.items
    const order = req.body.order
    const order_id = Math.floor(Math.random()*1000000) * Math.floor(Math.random()*1000000)
    const products = []
    if(items) {
        items.forEach(item => {
            products.push({price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image.url]
                },
                unit_amount: Math.round(item.price - (item.price / item.discount)),
            },
            tax_rates: ['txr_1OcirdHqJG0haLuz5bZ2fdf0'],
            quantity: item.ordered_quantity,})
        });
    }
    else {
        return res.status(500).json({error: 'No products found'});
    }

    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: products,
            mode: 'payment',
            success_url: `${req.headers.origin}/order-process?id=${order_id}`,
            cancel_url: `${req.headers.origin}`,
        });
        if(session) {
            const result = await fetch(`${req.headers.origin}/api/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...order, stripe_id: session.id, order_id, payment_url: session.url})
            })
            const response = await result.json()
            if(response.success === true) {
                console.log(session)
                return res.status(200).json({ id: session.id });
            } else {
                return res.status(500).json({error: response.error || 'Internal server error'});
            }
        }
        else {
            return res.status(500).json({error: 'Could not connect to payment server'});
        }
    } catch (err) {
        return res.status(err.statusCode || 500).json(err.message);
    }
}