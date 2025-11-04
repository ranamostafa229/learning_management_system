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
  lessonSchema,
  LessonSchemaType,
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

export async function createLesson(
  values: LessonSchemaType
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
    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.lesson.findFirst({
        where: {
          chapterId: validation.data.chapterId,
        },
        select: {
          posititon: true,
        },
        orderBy: {
          posititon: "desc",
        },
      });
      await tx.lesson.create({
        data: {
          title: validation.data.name,
          chapterId: validation.data.chapterId,
          description: validation.data.description,
          thumbnailKey: validation.data.thumbnailKey,
          videoKey: validation.data.videoKey,
          posititon: (maxPosition?.posititon ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/courses/${validation.data.courseId}/edit`);
    return {
      status: "success",
      message: "Lesson created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create lesson. Please try again.",
    };
  }
}

export async function deleteLesson(
  courseId: string,
  chapterId: string,
  lessonId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const chapterWithLessons = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        lessons: {
          orderBy: {
            posititon: "asc",
          },
          select: {
            id: true,
            posititon: true,
          },
        },
      },
    });
    if (!chapterWithLessons) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }
    const lessons = chapterWithLessons.lessons;
    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);

    if (!lessonToDelete) {
      return {
        status: "error",
        message: "Lesson not found in the chapter.",
      };
    }

    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);

    const updates = remainingLessons.map((lesson, index) => {
      return prisma.lesson.update({
        where: {
          id: lesson.id,
        },
        data: {
          posititon: index + 1,
        },
      });
    });

    await prisma.$transaction([
      ...updates,
      prisma.lesson.delete({
        where: {
          chapterId: chapterId,
          id: lessonId,
        },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Lesson deleted and positions reordered successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete lesson",
    };
  }
}

export async function deleteChapter(
  courseId: string,
  chapterId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const courseWithChapters = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        chapter: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });
    if (!courseWithChapters) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    const chapters = courseWithChapters.chapter;
    const chapterToDelete = chapters.find(
      (chapter) => chapter.id === chapterId
    );
    if (!chapterToDelete) {
      return {
        status: "error",
        message: "Chapter not found in the course.",
      };
    }

    const remainingChapters = chapters.filter(
      (chapter) => chapter.id !== chapterId
    );

    const updates = remainingChapters.map((chapter, index) => {
      return prisma.chapter.update({
        where: {
          id: chapter.id,
        },
        data: {
          position: index + 1,
        },
      });
    });
    await prisma.$transaction([
      ...updates,
      prisma.chapter.delete({
        where: {
          id: chapterId,
        },
      }),
    ]);

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapter deleted and positions reordered successfully",
    };
  } catch (err) {
    console.error(err);
    return { status: "error", message: "Failed to delete chapter" };
  }

  // } catch {
  //   return {
  //     status: "error",
  //     message: "Failed to delete chapter",
  //   };
  // }
}
