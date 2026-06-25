import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import User from "@/models/User";
import connectToDatabase from "./db";

export async function requireAdmin(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        user: null,
        error: NextResponse.json(
          { success: false, message: "Authentication required" },
          { status: 401 }
        ),
      };
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload || !payload.userId) {
      return {
        user: null,
        error: NextResponse.json(
          { success: false, message: "Invalid or expired token" },
          { status: 401 }
        ),
      };
    }

    await connectToDatabase();
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return {
        user: null,
        error: NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        ),
      };
    }

    if (user.role !== "admin") {
      return {
        user: null,
        error: NextResponse.json(
          { success: false, message: "Admin access required" },
          { status: 403 }
        ),
      };
    }

    return { user, error: null };
  } catch (error) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: "Authentication failed" },
        { status: 401 }
      ),
    };
  }
}