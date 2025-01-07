import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function POST(req, res) {
    const { email, password, newPassword } = req.body;

    await connectMongoDB();

    try {
        const user = await User.findOne({ email }).select("password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const dbPassword = user.password || "";
        const inputPassword = password || "";

        if (dbPassword !== inputPassword) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }

        if (!newPassword) {
            return res.status(400).json({ error: "New password must be provided" });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed." });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}
