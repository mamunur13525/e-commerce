import { connectMongoDB } from "../../../lib/mongodb"
import User from "../../../models/user"

export default async function POST(req, res) {
    const data = req.body
    const uid = req.body._id

    delete data.createdAt
    delete data.updatedAt
    delete data._id

    await connectMongoDB()
    const doc = await User.findOneAndUpdate({_id: uid}, {...data}, {
        returnOriginal: false
    });
    console.log(doc)
    res.send(doc)
}