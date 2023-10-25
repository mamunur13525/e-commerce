import { connectMongoDB } from "../../../lib/mongodb"
import User from "../../../models/user"

export default async function POST(req, res) {
    const {name, email, password} = req.body

    await connectMongoDB()
    const userExists = await User.findOne({email}).select("_id")
    
    if(userExists) {
        res.send({error: 'This email is already registered!'})
    }
    else {
        await User.create({name, email, password})
        return res.send({name, email, message: 'User created successfully', apiType: 'register'})
    }
}