import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/lib/env";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5, // max 5 requests per window (1 minute)
    })
  );
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const decision = await aj.protect(request, {
      fingerprint: session?.user?.id!,
    });
    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Not allowed to upload" },
        { status: 429 }
      );
    }
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
