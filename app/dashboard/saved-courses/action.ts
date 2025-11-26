"use server";
import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function DeleteSavedCourses(): Promise<ApiResponse> {
  const session = await requireUser();
  try {
    const result = await prisma.savedCourse.deleteMany({
      where: {
        userId: session.id,
      },
    });
    revalidatePath("/dashboard/saved-courses");
    return {
      status: "success",
      message: `${result.count} courses deleted successfully`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error(error);
    return {
      status: "error",
      message: "Failed while deleting saved courses",
    };
  }
}
