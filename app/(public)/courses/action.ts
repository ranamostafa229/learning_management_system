"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";

export async function ToggleSavedCourses(
  courseId: string
): Promise<ApiResponse> {
  const session = await requireUser();
  try {
    const courseExists = await prisma.savedCourse.findUnique({
      where: {
        userId_courseId: {
          userId: session.id,
          courseId: courseId,
        },
      },
    });
    if (courseExists) {
      await prisma.savedCourse.delete({
        where: {
          userId_courseId: {
            userId: session.id,
            courseId: courseId,
          },
        },
      });
      return {
        status: "success",
        message: "Course removed from saved successfully",
      };
    }
    await prisma.savedCourse.create({
      data: {
        userId: session.id,
        courseId: courseId,
      },
    });

    return {
      status: "success",
      message: "Course saved successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to save course",
    };
  }
}
