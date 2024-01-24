import { connectMongoDB } from "../../../lib/mongodb"
import User from "../../../models/user"

export default async function POST(req, res) {
    const data = req.body
    const uid = req.body._id

    delete data.createdAt
    delete data.updatedAt
    delete data._id

    await connectMongoDB()
    try {
        const doc = await User.findOneAndUpdate({_id: uid}, {...data}, {
            returnOriginal: false
        });
        return res.send(doc)
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}