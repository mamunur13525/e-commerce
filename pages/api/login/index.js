import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function POST(req, res) {
    const { email, password } = req.body

    await connectMongoDB();
    try {
        const user = await User.findOne({email})

        if(user) {
            if(user.password == password) {
                return res.send({name: user.fullName, email: user.email})
            }
            else {
                return res.send({error: 'Provided password is incorrect'})
            }
        }
        else {
            return res.send({error: 'There is no account with this email'})
        }
    } catch (error) {
        res.send({message: error || 'Internal server error'})
    }
}