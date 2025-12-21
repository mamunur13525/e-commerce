import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { first_name, last_name, email, password } = body;

    // Validation
    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
    });

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
      phone: user.phone || "",
      image: user.image || "",
      addresses: user.addresses || [],
    };

    return NextResponse.json({
      success: true,
      token,
      user: userData,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

