import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export default async function POST(req, res) {
    const { name, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Validate password strength
    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Validate name
    if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Parse name
    const separatedName = name.trim().split(' ');
    const firstName = separatedName.shift();
    let lastName = '';
    if (separatedName.length > 0) {
        lastName = separatedName.join(' ');
    }

    await connectMongoDB();
    try {
        const userExists = await User.findOne({ email }).select("_id");

        if (userExists) {
            return res.status(409).json({ error: 'This email is already registered!' });
        }

        // Hash password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user with hashed password
        await User.create({
            firstName,
            lastName,
            fullName: name.trim(),
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            name: name.trim(),
            email,
            message: 'User created successfully',
            apiType: 'register'
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}