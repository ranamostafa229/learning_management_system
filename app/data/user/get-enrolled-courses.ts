import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getEnrolledCourses() {
  const user = await requireUser();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      course: {
        select: {
          id: true,
          title: true,
          smallDescription: true,
          fileKey: true,
          level: true,
          slug: true,
          price: true,
          chapter: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return data;
}
