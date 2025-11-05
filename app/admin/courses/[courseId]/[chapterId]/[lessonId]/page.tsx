import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import LessonForm from "../../../_components/lesson/LessonForm";
import { Edit } from "lucide-react";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;
const LessonPage = async ({ params }: { params: Params }) => {
  const { courseId, chapterId, lessonId } = await params;
  const data = await adminGetLesson(lessonId);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="flex font-medium text-xl gap-3 items-center">
        <Edit size={20} />
        Edit Lesson
      </h1>
      <LessonForm
        initialData={data}
        action="edit"
        courseId={courseId}
        chapterId={chapterId}
      />
    </div>
  );
};

export default LessonPage;
