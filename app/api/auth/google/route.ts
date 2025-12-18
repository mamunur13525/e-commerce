import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { googleId, email, first_name, last_name, image } = body;

    // Validation
    if (!googleId || !email) {
      return NextResponse.json(
        { success: false, message: "Google ID and email are required" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await User.findOne({
      $or: [{ googleId }, { email }],
    });

    if (user) {
      // Update user if they logged in with Google before but didn't have googleId
      if (!user.googleId) {
        user.googleId = googleId;
        if (image) user.image = image;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        googleId,
        email,
        first_name: first_name || "User",
        last_name: last_name || "",
        image: image || "",
      });
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Return user data (without password)
    const userData = {
      _id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: user.image,
      googleId: user.googleId,
    };

    return NextResponse.json({
      success: true,
      token,
      user: userData,
    });
  } catch (error: any) {
    console.error("Google login error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

