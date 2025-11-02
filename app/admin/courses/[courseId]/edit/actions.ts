"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
} from "@/lib/zodSchemas";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

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

export async function editCourse(
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const session = await requireAdmin();
  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user?.id,
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
    const validation = courseSchema.safeParse(data);
    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid input data",
      };
    }
    await prisma.course.update({
      where: {
        id: courseId,
        userId: session.user.id,
      },
      data: {
        ...validation.data,
      },
    });
    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update course. Please try again.",
    };
  }
}

export async function reorderLessons(
  courseId: string,
  chapterId: string,
  lessons: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "No lessons provided to reorder",
      };
    }
    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          chapterId: chapterId,
          id: lesson.id,
        },
        data: {
          posititon: lesson.position,
        },
      })
    );
    await prisma.$transaction(updates); // run all updates in a transaction to make one db call
    // transaction allows us to run all these update command in one single atomic operation

    revalidatePath(`/admin/courses/${courseId}/edit`); // to refetch the data on the client page
    // revalidatePath is used to invalidate the cache as nextjs cachese the data
    // benefit of using useTransation hook is takes this function into account
    // while useState hook will just skip this function

    return {
      status: "success",
      message: "Lessons reordered successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder lessons. Please try again.",
    };
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "No chapters provided to reorder",
      };
    }
    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    );
    await prisma.$transaction(updates); // run all updates in a transaction to make one db call

    revalidatePath(`/admin/courses/${courseId}/edit`); // to refetch the data on the client page

    return {
      status: "success",
      message: "Chapters reordered successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder chapters. Please try again.",
    };
  }
}
export async function createChapter(
  values: ChapterSchemaType
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const validation = chapterSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid input data",
      };
    }
    // using transaction to ensures that if two users try to add chapter at the exact same time
    // ,they don't get the same position number as it create a single operation which is atomic
    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.chapter.findFirst({
        where: {
          courseId: validation.data.courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });
      await prisma.chapter.create({
        data: {
          title: validation.data.name,
          courseId: validation.data.courseId,
          position: (maxPosition?.position ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/courses/${validation.data.courseId}/edit`);
    return {
      status: "success",
      message: "Chapter created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create chapter. Please try again.",
    };
  }
}
