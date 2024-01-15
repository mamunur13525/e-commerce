import mongoose, { models } from "mongoose"

const orderSchema = new mongoose.Schema({
    user_details: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    product_details: {
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