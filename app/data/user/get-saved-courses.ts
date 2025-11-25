import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getSavedCourses() {
  const session = await requireUser();
  const data = await prisma.savedCourse.findMany({
    where: {
      userId: session.id,
    },
    select: {
      course: {
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
      },
    },
  });
  return data;
}

export type SavedCoursesType = Awaited<ReturnType<typeof getSavedCourses>>;
