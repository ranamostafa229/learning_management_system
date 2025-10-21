import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, contentType, size } = body;
    const key = `${uuidv4()}-${fileName}`;

    const cmd = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES!,
      Key: key,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, cmd, { expiresIn: 360 });

    return NextResponse.json({ presignedUrl, key });
  } catch (err) {
    console.error("presign error:", err);
    return NextResponse.json(
      { error: "Failed to generate presigned URL", details: String(err) },
      { status: 500 }
    );
  }
}
