import mongoose, { models } from "mongoose";
import { type } from "os";

const imageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Image ID is required."],
    },
    url: {
        type: String,
        required: [true, "Image URL is required."],
    },
    display_url: {
        type: String,
        required: [true, "Display image URL is required."],
    },
});

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Product ID is required."],
    },
    name: {
        type: String,
        required: [true, "Product name is required."],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required."],
    },
    discount: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "Product price is required."],
    },
    finalPrice: { // price - (discount percentage / 100) * price * quantity
        type: Number,
        required: [true, "Product final price is required."],
    },
    variant: {
        type: String,
        required: false,
    },
    images: {
        type: imageSchema,
        required: [true, "Product image is required."],
    }
});


const subOrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: [true, "Main order id is required."]
        },
        products: [productSchema],
        vendorId: {
            type: String,
            required: [true, "Vendor id is required."]
        },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending"
        },
        userId: {
            type: String,
            required: [true, "User id is required."]
        },
        taxes: {
            type: Number,
            default: 0,
        },
        subtotal: { // sum of all products final price
            type: Number,
            required: [true, "Subtotal is required."],
        },
        total: { // subtotal + taxes
            type: Number,
            required: [true, "Total is required."],
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const SubOrder = models.SubOrder || mongoose.model("SubOrder", subOrderSchema);

export default SubOrder;