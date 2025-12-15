import mongoose, { models } from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    store: {
        id: {
            type: String,
            required: true
        },
        name: { // Assuming the unkeyed object was meant to be a 'name' property for the store
            type: String,
            required: true
        }
    }
},
    {
        timestamps: true,
        versionKey: false
    })

const Product = models.Product || mongoose.model('Product', productSchema)

export default Product