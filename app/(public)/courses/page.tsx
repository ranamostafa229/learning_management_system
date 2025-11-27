import {
  getAllCourses,
  getAllCoursesForUser,
} from "@/app/data/course/get-all-courses";
import PublicCourseCard, {
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PublicCoursesRoute = () => {
  return (
    <div className="relative top-16 container mx-auto pt-10 px-4 lg:px-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals
        </p>
      </div>
      {/* courses */}
      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
};

export default PublicCoursesRoute;
const RenderCourses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const publicCourses = await getAllCourses();
  const userCourses = await getAllCoursesForUser(session?.user.id || "");

  const courses = session?.user.id ? userCourses : publicCourses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10  gap-6 justify-center">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} saved={course.saved} />
      ))}
    </div>
  );
};

const LoadingSkeletonLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10  gap-6 justify-center">
      {Array.from({ length: 3 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
};
