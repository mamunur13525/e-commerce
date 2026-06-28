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

    // Find existing metadata document or create a new one
    let metadata = await Metadata.findOne();

    if (!metadata) {
      metadata = new Metadata();
    }

    if (hero_slider !== undefined) {
      metadata.hero_slider = hero_slider;
    }

    if (offers !== undefined) {
      metadata.offers = offers;
    }

    if (discout_cards !== undefined) {
      metadata.discout_cards = discout_cards;
    }

    await metadata.save();

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
