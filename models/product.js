import mongoose, { models } from "mongoose"

const productSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    base_price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    weight_category: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    item_img: {
        type: String,
        required: true
    },
    nestedImages: {
        type: Array,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

const Product = models.Product || mongoose.model('Product', productSchema)

export default Product