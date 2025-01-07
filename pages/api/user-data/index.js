import { connectMongoDB } from "../../../lib/mongodb"
import User from "../../../models/user";

export default async function POST(req, res) {
    const { email } = req.body

    await connectMongoDB();
    try {
        const userData = await User.findOne({ email }, { password: 0, createdAt: 0, updatedAt: 0 })
        console.log(userData)

        if (userData?.email) {
            return res.status(200).json(userData || {})
        }
        else {
            return res.status(500).json({ error: 'Internal server error' })
        }
    } catch (error) {
        return res.status(500).json({ message: error || 'Internal server error' })
    }
}