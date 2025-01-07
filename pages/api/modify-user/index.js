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
        const doc = await User.findOneAndUpdate(
            { _id: uid },
            { ...data },
            {
                new: true,
                select: '-password -createdAt -updatedAt',
            }
        );

        if (!doc) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(doc);
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}