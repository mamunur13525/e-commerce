import mongoose, { models } from "mongoose"

const metadataSchema = new mongoose.Schema({
    slider_data: {
        type: Array,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    product_show_quantity: {
        type: Number,
        required: true,
        default: 10
    }
},
{
    timestamps: true,
    versionKey: false
})

const Metadata = models.Metadata || mongoose.model('Metadata', metadataSchema)

export default Metadata;