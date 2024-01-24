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
    status: {
        type: String,
        required: true,
        default: 'Pending',
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