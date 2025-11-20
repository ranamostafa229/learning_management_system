import { ReactNode } from "react";
import CourseSidebar from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface Props {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}
const CourseDisplaylayout = async ({ children, params }: Props) => {
  const { slug } = await params;
  const data = await getCourseSidebarData(slug);
  return (
    <div className="flex flex-col md:flex-col lg:flex-row   ">
      {/* sidebar 30% */}
      <div className="w-full lg:w-80  border-r border-border shrink-0 ">
        <CourseSidebar course={data.course} />
      </div>
      {/* main content 70% */}
      <div className="flex-1 overflow-hidden pt-4 lg:pt-0 ">{children}</div>
    </div>
  );
};

export default CourseDisplaylayout;
