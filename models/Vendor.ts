import mongoose, { models } from 'mongoose'

const vendorSchema = new mongoose.Schema({
    // Custom Vendor ID (separate from MongoDB _id)
    vendorId: {
        type: String,
        required: true,
        unique: true,
    },
    // Vendor Store Information
    storeName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    logo: {
        type: Object,  // Accept Object format for image data
        required: false,
    },
    // Platform Settings
    vendorStatus: {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        default: 'pending'
    },
    commissionRate: {
        type: Number,
        default: 0,
        description: 'Commission percentage (0-100) that the platform takes from vendor sales'
    },
    // Analytics
    totalSales: {
        type: Number,
        default: 0,
    },
    totalOrders: {
        type: Number,
        default: 0,
    },
    totalProducts: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    // Relationship
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // One vendor per user
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'vendors'
})

const Vendor = models.Vendor || mongoose.model('Vendor', vendorSchema)

export default Vendor;
