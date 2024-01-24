import { connectMongoDB } from "../../../lib/mongodb"
import User from "../../../models/user"

export default async function POST(req, res) {
    const {name, email, password} = req.body
    const separatedName = name.split(' ')
    const firstName = separatedName.shift();
    let lastName = ''
    if(separatedName) {
        lastName = separatedName.join(' ')
    }
    

    await connectMongoDB()
    try {
        const userExists = await User.findOne({email}).select("_id")
    
        if(userExists) {
            return res.send({error: 'This email is already registered!'})
        }
        else {
            await User.create({firstName, lastName, fullName: name, email, password})
            return res.send({name, email, message: 'User created successfully', apiType: 'register'})
        }
    } catch (error) {
        return res.status(500).json({message: error || 'Internal server error'})
    }
}