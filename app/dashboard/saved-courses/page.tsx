import PublicCourseCard from "@/app/(public)/_components/PublicCourseCard";
import {
  getSavedCourses,
  SavedCoursesType,
} from "@/app/data/user/get-saved-courses";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SavedCourses = async () => {
  const courses = await getSavedCourses();

  return (
    <section className="flex flex-wrap lg:flex-nowrap gap-4">
      <div className="w-full lg:w-96 flex flex-col gap-4 ">
        <div className="flex justify-between">
          <h4 className="font-medium">Saved Courses</h4>
          <span>{courses.length} Courses</span>
        </div>
        <Separator className="bg-border dark:bg-white" />
        <Button> Remove All Courses</Button>
      </div>
      <RenderSavedCourses courses={courses} />
    </section>
  );
};

export default SavedCourses;

const RenderSavedCourses = ({ courses }: { courses: SavedCoursesType }) => {
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
