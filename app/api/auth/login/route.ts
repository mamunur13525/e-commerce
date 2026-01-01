import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password } = body;
    const trimmedPassword = password.trim();
console.log({email, password: trimmedPassword})
    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user has password (not Google-only user)
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message: `Please login with Google.
          You don't have a password.`,
        },
        { status: 401 }
      );
    }
  console.log({user:user})

    // Verify password
    console.log("Stored password hash:", user.password ? user.password.substring(0, 20) + "..." : "NULL/EMPTY");
    console.log("Attempting to compare password:", trimmedPassword);
    const isPasswordValid = await user.comparePassword(trimmedPassword);
    console.log({isPasswordValid, storedPasswordExists: !!user.password})
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
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
      phone: user.phone || "",
      image: user.image || "",
      googleId: user.googleId,
      addresses: user.addresses || [],
    };

    return NextResponse.json({
      success: true,
      token,
      user: userData,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
