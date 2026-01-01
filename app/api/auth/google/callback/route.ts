import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (error) {
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=no_code`);
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${baseUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error("Failed to get access token");
    }

    // Get user info from Google
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenData.access_token}`
    );
    const userInfo = await userInfoResponse.json();

    // Connect to database and create/update user
    await connectToDatabase();

    let user = await User.findOne({
      $or: [{ googleId: userInfo.id }, { email: userInfo.email }],
    });

    if (user) {
      // Update user if they logged in with Google before but didn't have googleId
      if (!user.googleId) {
        user.googleId = userInfo.id;
        if (userInfo.picture) user.image = userInfo.picture;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        googleId: userInfo.id,
        email: userInfo.email,
        first_name: userInfo.given_name || userInfo.name?.split(" ")[0] || "User",
        last_name: userInfo.family_name || userInfo.name?.split(" ").slice(1).join(" ") || "",
        image: userInfo.picture || "",
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
      phone: user.phone || "",
      image: user.image || "",
      googleId: user.googleId,
      addresses: user.addresses || [],
    };

    // Redirect to frontend with token and user info
    const redirectUrl = new URL(`${baseUrl}/login`);
    redirectUrl.searchParams.set("token", token);
    redirectUrl.searchParams.set("user", JSON.stringify(userData));

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error: any) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(
      `${baseUrl}/login?error=${encodeURIComponent(error.message || "Authentication failed")}`
    );
  }
}

