import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import EditCourseForm from "./_components/EditCourseForm";

type Params = Promise<{ courseId: string }>;
export default async function EditCourse({ params }: { params: Params }) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);
  return (
    <div className="flex flex-col gap-10">
      <h1 className="flex font-medium text-xl gap-3 items-center">
        <Edit size={20} />
        Edit Course
      </h1>
      <Card className="rounded-md">
        <Tabs defaultValue="Basic Information" className="py-2 px-5 gap-5">
          <TabsList className="w-full h-12">
            <TabsTrigger
              value="Basic Information"
              className="data-[state=active]:!bg-primary data-[state=active]:!text-white py-4 "
            >
              Basic Information
            </TabsTrigger>
            <TabsTrigger
              value="Course Strucutre"
              className="data-[state=active]:!bg-primary data-[state=active]:!text-white py-4 "
            >
              Course Strucutre
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Basic Information" className="ml-2">
            <EditCourseForm data={data} />
          </TabsContent>
          <TabsContent value="Course Strucutre" className="ml-2">
            Change your password here.
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
