"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { headers } from "next/headers";

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
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
    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user?.id as string,
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
