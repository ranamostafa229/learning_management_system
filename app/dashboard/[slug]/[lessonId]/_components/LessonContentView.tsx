"use client";
import { useConfetti } from "@/hooks/use-confetti";
import { useTransition } from "react";
import { markLessonComplete } from "../actions";
import { tryCatch } from "@/hooks/try-catch";
import LessonVideoPlayer from "./LessonVideoPlayer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { toast } from "sonner";
import { LessonContentType } from "@/app/data/course/get-lesson-content";

interface Props {
  data: LessonContentType;
}
const LessonContentView = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.Chapter.Course.slug)
      );
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result?.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-background pl-1 lg:pl-6 gap-2">
      <h1 className="text-2xl font-bold tracking-tight text-foreground pb-1">
        {data.title}
      </h1>
      <LessonVideoPlayer
        videoKey={data.videoKey ?? ""}
        thumbnailKey={data.thumbnailKey ?? ""}
      />
      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant={"outline"}
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircle className="size-4 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button variant={"outline"} onClick={onSubmit} disabled={pending}>
            <CheckCircle className="size-4 text-green-500" />
            Mark as Complete
          </Button>
        )}
      </div>
      <div>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
};

export default LessonContentView;
