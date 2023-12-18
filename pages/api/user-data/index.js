import { connectMongoDB } from "../../../lib/mongodb"
import User from "../../../models/user";

export default async function POST(req, res) {
    const {email} = req.body

    await connectMongoDB();
    const userData = await User.findOne({email})
    
    if(userData?.email) {
        const newData = {...userData._doc}
        delete newData.password
        res.status(200).json(newData)
    }
    else {
        res.status(400).json({error: 'User data could not be loaded. Please reload the page.'})
    }
}