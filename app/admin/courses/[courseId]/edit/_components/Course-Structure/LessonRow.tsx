import { Button } from "@/components/ui/button";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { FileText, GripVertical, Trash2 } from "lucide-react";
import Link from "next/link";

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
      <Button variant={"ghost"} size={"icon"}>
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};

export default LessonRow;
