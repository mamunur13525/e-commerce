import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export default async function POST(req, res) {
    const { email, password } = req.body;

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Validate password
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    await connectMongoDB();
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Return user data (excluding password)
        return res.status(200).json({
            name: user.fullName,
            email: user.email
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}