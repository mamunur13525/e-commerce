import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Metadata from "@/models/Metadata";

export async function GET() {
  try {
    await connectToDatabase();
    const metadata = await Metadata.findOne();

    if (!metadata) {
      return NextResponse.json(
        { success: false, message: "Metadata not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
