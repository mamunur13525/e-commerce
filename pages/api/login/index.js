import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function POST(req, res) {
    const { email, password } = req.body

    await connectMongoDB();
    const user = await User.findOne({email})

    if(user) {
        if(user.password == password) {
            res.send({name: user.name, email: user.email})
        }
        else {
            res.send({error: 'Provided password is incorrect'})
        }
    }
    else {
        res.send({error: 'There is no account with this email'})
    }
}