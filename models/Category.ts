import mongoose, { models } from "mongoose"

const categorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: false,
    },
    count: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
        versionKey: false
    })

const Category = models.Category || mongoose.model('Category', categorySchema)

export default Category
