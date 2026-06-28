import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/db";
import Metadata from "@/models/Metadata";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const metadata = await Metadata.findOne().lean();

    if (!metadata) {
      return NextResponse.json(
        { success: false, message: "Metadata not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectToDatabase();

    const body = await request.json();
    const { hero_slider, offers, discout_cards } = body;

    // Build update object with only provided fields
    const updateData: Record<string, any> = {};
    if (hero_slider !== undefined) updateData.hero_slider = hero_slider;
    if (offers !== undefined) updateData.offers = offers;
    if (discout_cards !== undefined) updateData.discout_cards = discout_cards;

    // Atomically update the first document or create if none exists
    const metadata = await Metadata.findOneAndUpdate(
      {},
      { $set: updateData },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: metadata,
      message: "Metadata updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating metadata:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
