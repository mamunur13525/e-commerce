import { connectMongoDB } from "../../../lib/mongodb"
import Metadata from "../../../models/metadata";

export default async function GET(req, res) {

    await connectMongoDB();
    try {
        const metadata = await Metadata.find()
        return res.status(200).json(metadata[0])
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}