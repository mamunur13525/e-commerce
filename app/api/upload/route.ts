import { NextRequest, NextResponse } from "next/server";
import imagekit from "@/lib/imagekit";

export async function POST(req: NextRequest) {
  try {
    const { base64, fileName, folder } = await req.json();

    if (!base64 || !fileName) {
      return NextResponse.json(
        { success: false, message: "base64 and fileName are required" },
        { status: 400 }
      );
    }

    const response = await imagekit.files.upload({
      file: base64,
      fileName,
      folder: folder ?? "/vendors",
      useUniqueFileName: true,
    });
    return NextResponse.json(
      {
        success: true,
        url: response.url,
        id: response.fileId,
        display_url: response.thumbnailUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json(
      { success: false, message: "Image upload failed" },
      { status: 500 }
    );
  }
}
