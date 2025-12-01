import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}
const CourseDisplayRoute = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getCourseSidebarData(slug);

  const firstChapter = data?.course?.chapter[0];
  const firstLesson = firstChapter?.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }
  return (
    <div className="flex  flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold">No Lessons available</h2>
      <p>This course does not have any lessons yet!</p>
    </div>
  );
};

export default CourseDisplayRoute;
