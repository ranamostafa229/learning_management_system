"use server";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { constructUrl } from "@/hooks/use-construct-url";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5, // max 5 requests per window (1 minute)
  })
);
export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin(); // will be redirected if not admin as redirects works in server action
  try {
    // in route handlers, we natively have access to request object,
    // but in server actions we don't but arcjet created a helper function request
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user?.id!,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message:
            "You have blocked due to too many requests. Please try again later.",
        };
      } else {
        return {
          status: "error",
          message: "bot-like behavior detected. Action denied",
        };
      }
    }
    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.message || "Invalid input data",
      };
    }
    const existingSlug = await prisma.course.findUnique({
      where: { slug: validation.data.slug },
    });
    if (existingSlug) {
      return {
        status: "error",
        message: "Slug already exists, please choose another one",
      };
    }
    const imageUrl = constructUrl(validation.data.fileKey);

    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: "usd",
        unit_amount: validation.data.price * 100,
      },
      images: [imageUrl],
    });
    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user?.id as string,
        stripPriceId: data?.default_price as string,
      },
    });
    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log("Error creating course:", error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
