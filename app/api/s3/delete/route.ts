import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { error } from "console";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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
export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const decision = await aj.protect(request, {
      fingerprint: session?.user?.id!,
    });
    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Not allowed to delete" },
        { status: 429 }
      );
    }
    const body = await request.json();
    const { key } = body;
    if (!key) {
      return NextResponse.json(
        { error: "Missing or Invalid key" },
        { status: 400 }
      );
    }
    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES!,
      Key: key,
    });
    await S3.send(command);
    return NextResponse.json({
      message: "File deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
