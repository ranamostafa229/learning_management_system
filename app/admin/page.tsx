import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses";
import {
  CourseTable,
  CourseTableSkeleton,
} from "./courses/_components/course/CourseTable";
import { Suspense } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "../../components/general/EmptyState";

export default async function AdminIndexDashboard() {
  const enrollmentData = await adminGetEnrollmentStats();
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            href={"/admin/courses"}
            className={buttonVariants({ variant: "outline" })}
          >
            View All Courses
          </Link>
        </div>
        <Suspense fallback={<CourseTableSkeletonLayout />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const data = await adminGetRecentCourses();

  if (data.length !== 0) {
    return (
      <EmptyState
        description="No courses found. Create your first course to get started!"
        buttonText={"Create New course"}
        href={"/admin/courses/create"}
      />
    );
  }

  return (
    <div>
      <CourseTable courses={data} />
    </div>
  );
}
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
      {Array.from({ length: 2 }).map((_, index) => (
        <CourseTableSkeleton key={index} />
      ))}
    </Table>
  );
};
