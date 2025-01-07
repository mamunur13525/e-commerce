import mongoose, { models } from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String || null,
    },
    orders: {
        type: Array,
        required: false,
    },
    phone: {
        type: String,
        required: false,
        default: ''
    },
    bio: {
        type: String,
        required: false,
        default: ''
    },
    company: {
        type: String,
        required: false,
        default: ''
    }
},
{
    timestamps: true,
    versionKey: false
})

const User = models.User || mongoose.model('User', userSchema)

export default User;