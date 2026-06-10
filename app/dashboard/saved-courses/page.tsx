import PublicCourseCard from "@/app/(public)/_components/PublicCourseCard";
import {
  getSavedCourses,
  SavedCoursesType,
} from "@/app/data/user/get-saved-courses";
import { Separator } from "@/components/ui/separator";
import RemoveAllCourses from "./_components/RemoveAllCourses";
import EmptyState from "@/components/general/EmptyState";
import { cn } from "@/lib/utils";

const SavedCourses = async () => {
  const courses = await getSavedCourses();

  return (
    <section
      className={cn(
        "flex flex-wrap lg:flex-nowrap gap-4",
        courses.length === 0 && "flex flex-col",
      )}
    >
      <div
        className={cn(
          "w-full lg:w-96 flex flex-col gap-4 ",
          courses.length === 0 && "lg:w-full",
        )}
      >
        <div className="flex justify-between">
          <h4 className="font-medium">Saved Courses</h4>
          <span>{courses.length} Courses</span>
        </div>
        <Separator className="bg-border dark:bg-white" />
        {courses.length > 0 && <RemoveAllCourses />}
      </div>
      <RenderSavedCourses courses={courses} />
    </section>
  );
};

export default SavedCourses;

const RenderSavedCourses = ({ courses }: { courses: SavedCoursesType }) => {
  if (courses.length === 0) {
    return (
      <div className="w-full">
        <EmptyState
          description="No saved courses found. Save a course to get started!"
          buttonText={"Explore Courses"}
          href={"/courses"}
        />
      </div>
    );
  }
  return (
    <div className="w-full space-y-4">
      {courses.map(({ course }) => (
        <PublicCourseCard
          key={course.id}
          data={{ ...course, saved: true }}
          saved={true}
          orientation="horizontal"
          revalidatePath="`/dashboard/saved-courses`"
        />
      ))}
    </div>
  );
};
