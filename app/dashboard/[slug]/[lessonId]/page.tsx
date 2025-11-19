import { getLessonContent } from "@/app/data/course/get-lesson-content";
import LessonContentView from "./_components/LessonContentView";

type Params = Promise<{ lessonId: string }>;
const LessonContentPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;

  const data = await getLessonContent(lessonId);

  return <LessonContentView data={data} />;
};

export default LessonContentPage;
