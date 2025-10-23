import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { CourseHeader } from "./_components/CourseHeader";
import { CourseTable } from "./_components/CourseTable";

const CoursesPage = async () => {
  try {
    const courses = await adminGetCourses();

    return (
      <section className="flex flex-col gap-8">
        <CourseHeader />
        <CourseTable courses={courses} />
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
