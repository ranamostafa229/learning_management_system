import "server-only";
import { prisma } from "@/lib/db";

export async function getAllCourses() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      category: true,
      price: true,
      fileKey: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data.map((course) => ({
    ...course,
    saved: false,
  }));
}
export async function getAllCoursesForUser(userId: string) {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      category: true,
      price: true,
      fileKey: true,
      slug: true,
      savedCourses: {
        where: {
          userId,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data.map((course) => ({
    ...course,
    saved: course.savedCourses.length > 0,
  }));
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
export type PublicCourseTypeWithSaved = Awaited<
  ReturnType<typeof getAllCoursesForUser>
>[0];
