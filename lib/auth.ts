import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import User from "@/models/User";
import connectToDatabase from "./db";

export async function getUserFromToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    await connectToDatabase();
    const user = await User.findById(payload.userId).select("-password");
    
    return user;
  } catch (error) {
    return null;
  }
}

