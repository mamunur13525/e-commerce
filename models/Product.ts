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
    final_price: {
        type: Number,
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
        required: false,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    discountType: {
        type: String,
        enum: ["amount", "percentage"],
        default: "percentage"
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
    sizes: {
        type: [String],
        required: false
    },
    colors: {
        type: [{
            name: {
                type: String,
                required: true
            },
            code: {
                type: String,
                required: true
            }
        }],
        required: false
    }
},
    {
        timestamps: true,
        versionKey: false
    })

const Product = models.Product || mongoose.model('Product', productSchema)

export default Product