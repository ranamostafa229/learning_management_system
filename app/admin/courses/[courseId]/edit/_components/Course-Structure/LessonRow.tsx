import { Button } from "@/components/ui/button";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { FileText, GripVertical } from "lucide-react";
import Link from "next/link";
import DeleteLesson from "./DeleteLesson";

interface LessonRowProps {
  listeners: DraggableSyntheticListeners;
  lesson: {
    id: string;
    title: string;
    order: number;
  };
  chapterId: string;
  courseId: string;
}
const LessonRow = ({
  listeners,
  lesson,
  chapterId,
  courseId,
}: LessonRowProps) => {
  return (
    <div
      className="flex items-center justify-between p-1
        hover:bg-accent bg-secondary rounded-sm"
    >
      <div className="flex items-center gap-2 font-medium text-sm">
        <Button
          variant={"ghost"}
          size={"icon"}
          {...listeners}
          className="cursor-move"
        >
          <GripVertical className="size-4" />
        </Button>
        <FileText className="size-4" />
        <Link href={`/admin/courses/${courseId}/${chapterId}/${lesson.id}`}>
          {lesson.title}
        </Link>
      </div>
      {/* Delete lesson Modal */}
      <DeleteLesson
        courseId={courseId}
        chapterId={chapterId}
        lessonId={lesson.id}
      />
    </div>
  );
};

export default LessonRow;
