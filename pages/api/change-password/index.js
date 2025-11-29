import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export default async function POST(req, res) {
    const { email, password, newPassword } = req.body;

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Validate new password strength
    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: "New password must be at least 6 characters long" });
    }

    await connectMongoDB();

    try {
        const user = await User.findOne({ email }).select("password method");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // If user has existing password, verify old password
        if (user.password) {
            if (!password) {
                return res.status(400).json({ error: "Old password is required" });
            }
            const isOldPasswordValid = await bcrypt.compare(password, user.password);
            if (!isOldPasswordValid) {
                return res.status(400).json({ error: "Old password is incorrect" });
            }
        }

        // Hash new password before storing
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully." });
    } catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
