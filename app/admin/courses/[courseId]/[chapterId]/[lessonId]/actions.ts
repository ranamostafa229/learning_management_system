"use server";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchemas";

export async function updateLesson(
  values: LessonSchemaType,
  lessonId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const validation = lessonSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid input data",
      };
    }

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: validation.data.name,
        description: validation.data.description,
        thumbnailKey: validation.data.thumbnailKey,
        videoKey: validation.data.videoKey,
      },
    });
    return {
      status: "success",
      message: "Lesson updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update lesson",
    };
  }
}
