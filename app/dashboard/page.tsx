import EmptyState from "@/components/general/EmptyState";
import { getAllCoursesForUser } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import PublicCourseCard from "../(public)/_components/PublicCourseCard";
import CourseProgressCard from "./_components/CourseProgressCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const [courses, enrolledCourses] = await Promise.all([
    getAllCoursesForUser(session?.user.id || ""),
    getEnrolledCourses(),
  ]);
  // filter out enrolled courses
  const filteredCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(({ course: enrolled }) => enrolled.id === course.id)
  );
  const HeaderSection = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <span className="text-muted-foreground">{description}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-3">
        <HeaderSection
          title="Enrolled Courses"
          description="Here you can find all the courses you have access to"
        />
        {enrolledCourses.length === 0 ? (
          <EmptyState
            description="No courses found. You haven't purchased any courses yet"
            buttonText={"Browse Courses"}
            href={"/courses"}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseProgressCard data={course.course} key={course.course.id} />
            ))}
          </div>
        )}
      </section>
      <section className="flex flex-col gap-3">
        <HeaderSection
          title="Available Courses"
          description="Here you can find a list of all available courses you can enroll on our platform."
        />
        {filteredCourses.length === 0 ? (
          <EmptyState
            description="No courses found. You have already purchased all avaliable courses"
            buttonText={"Browse Courses"}
            href={"/courses"}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <PublicCourseCard
                data={course}
                key={course.id}
                saved={course.saved}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
