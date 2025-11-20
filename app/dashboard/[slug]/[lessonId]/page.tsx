import { getLessonContent } from "@/app/data/course/get-lesson-content";
import LessonContentView from "./_components/LessonContentView";
import { Suspense } from "react";
import LessonSkeleton from "./_components/LessonSkeleton";

type Params = Promise<{ lessonId: string }>;
const LessonContentPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
};

export default LessonContentPage;

const LessonContentLoader = async ({ lessonId }: { lessonId: string }) => {
  const data = await getLessonContent(lessonId);

  return <LessonContentView data={data} />;
};
