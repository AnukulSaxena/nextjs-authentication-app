import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Image from "@/model/image.model";
import { writeFile } from "fs";
import { uploadOnCloudinary } from "@/helpers/cloudinary";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized Request" },
        { status: 400 }
      );
    }

    const data = await request.formData();
    const file: File | null = data.get("image") as unknown as File;
    if (!file || !file?.type.includes("image")) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./public/${file.name}`;
    writeFile(path, buffer, () => {});
    const cloudResponse = await uploadOnCloudinary(path);
    if (!cloudResponse) {
      return NextResponse.json(
        { error: "Something went wrong while uploading." },
        { status: 500 }
      );
    }
    const imageCreated = await Image.create({
      imageUrl: cloudResponse?.url,
      owner: userId,
    });
    if (!imageCreated) {
      return NextResponse.json(
        { error: "something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      message: "File saved successfully",
      success: true,
      image: imageCreated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized Request" },
        { status: 400 }
      );
    }
    const imageData = await Image.find({
      owner: userId,
    });

    return NextResponse.json({
      message: "Image Fetched Successfully",
      success: true,
      image: imageData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
