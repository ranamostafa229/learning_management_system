import { CourseHeader } from "./_components/course/CourseHeader";
import {
  CourseTable,
  CourseTableSkeleton,
} from "./_components/course/CourseTable";
import { Suspense } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import EmptyState from "../../../components/general/EmptyState";

const CoursesPage = async () => {
  try {
    return (
      <section className="flex flex-col gap-8">
        <CourseHeader />
        <Suspense fallback={<CourseTableSkeletonLayout />}>
          <RenderCourses />
        </Suspense>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return (
      <section className="flex flex-col gap-8">
        <CourseHeader />
        <div className="bg-card p-8 text-center">
          <p className="text-red-500">
            Failed to load courses. Please try again later.
          </p>
        </div>
      </section>
    );
  }
};

export default CoursesPage;

const RenderCourses = async () => {
  const courses = await adminGetCourses();
  if (courses.length === 0) {
    return (
      <EmptyState description="No courses found. Create your first course to get started!" />
    );
  }
  return <CourseTable courses={courses} />;
};

const CourseTableSkeletonLayout = () => {
  return (
    <Table>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader className="bg-sidebar-accent">
        <TableRow>
          <TableHead className="w-[100px]">Thumbnail</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Level</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      {Array.from({ length: 3 }).map((_, index) => (
        <CourseTableSkeleton key={index} />
      ))}
    </Table>
  );
};
