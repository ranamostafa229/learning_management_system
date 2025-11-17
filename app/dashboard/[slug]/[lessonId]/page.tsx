import { getLessonContent } from "@/app/data/course/get-lesson-content";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import LessonVideoPlayer from "./_components/LessonVideoPlayer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type Params = Promise<{ lessonId: string }>;
const LessonContentPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;
  const data = await getLessonContent(lessonId);
  return (
    <div className="flex flex-col h-full bg-background pl-6 gap-2">
      <h1 className="text-2xl font-bold tracking-tight text-foreground pb-1">
        {data.title}
      </h1>
      <LessonVideoPlayer
        videoKey={data.videoKey ?? ""}
        thumbnailKey={data.thumbnailKey ?? ""}
      />
      <div className="py-4 border-b">
        <Button variant={"outline"}>
          <CheckCircle className="size-4 text-green-500" />
          Mark as Complete
        </Button>
      </div>
      <div>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
};

export default LessonContentPage;
