import mongoose, { models } from "mongoose"

const orderSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true,
    },
    contact: {
        type: Object,
        required: true
    },
    payment_status: {
        type: String,
        required: true,
        default: 'unpaid',
    },
    order_id: {
        type: String,
        required: true,
        default: Math.floor(Math.random()*1000000) * Math.floor(Math.random()*1000000)
    },
    stripe_id: {
        type: String,
        required: true
    },
    delivery_status: {
        type: String,
        required: true,
        default: 'order placed'
    },
    payment_url: {
        type: String,
        required: true,
        default: null
    },
    products: {
        type: Array,
        required: true,
    },
    subtotal: {
        type: String,
        required: true,
    },
    tax: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
    versionKey: false
})

const Order = models.Order || mongoose.model('Order', orderSchema)

export default Order;