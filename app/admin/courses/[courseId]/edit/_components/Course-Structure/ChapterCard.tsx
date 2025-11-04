import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../SortableItem";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import LessonRow from "./LessonRow";
import NewLessonModal from "./NewLessonModal";
import DeleteChapter from "./DeleteChapter";

interface ChapterCardProps {
  chapter: {
    id: string;
    title: string;
    order: number;
    isOpen: boolean;
    lessons: {
      id: string;
      title: string;
      order: number;
    }[];
  };
  toggleChapter: (chapterId: string) => void;
  listeners: DraggableSyntheticListeners;
  courseId: string;
}
const ChapterCard = ({
  chapter,
  toggleChapter,
  listeners,
  courseId,
}: ChapterCardProps) => {
  return (
    <Card className="py-0 rounded-sm">
      <Collapsible
        open={chapter.isOpen}
        onOpenChange={() => toggleChapter(chapter.id)}
      >
        {/* Chapter Header */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center ">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="cursor-grab opacity-60 hover:opacity-100"
              {...listeners}
            >
              <GripVertical className="size-4" />
            </Button>
            <CollapsibleTrigger asChild>
              <Button
                size={"icon"}
                variant="ghost"
                className="flex items-center"
              >
                {chapter.isOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <p className="cursor-pointer hover:text-primary pl-2 font-semibold ">
              {chapter.title[0].toUpperCase() + chapter.title.slice(1)}
            </p>
          </div>
          {/* Delete Chapter Alert */}
          <div>
            <DeleteChapter courseId={courseId} chapterId={chapter.id} />
          </div>
        </div>
        {/* Lessons */}
        <CollapsibleContent className="dark:bg-sidebar-accent pt-3">
          <SortableContext
            items={chapter.lessons.map((lesson) => lesson.id)}
            strategy={verticalListSortingStrategy}
          >
            {chapter.lessons.map((lesson) => (
              <SortableItem
                key={lesson.id}
                id={lesson.id}
                data={{ type: "lesson", chapterId: chapter.id }}
                className="px-3 pb-2 "
              >
                {(lessonsListeners) => (
                  <LessonRow
                    listeners={lessonsListeners}
                    chapterId={chapter.id}
                    courseId={courseId}
                    lesson={lesson}
                  />
                )}
              </SortableItem>
            ))}
          </SortableContext>
          {/* Add Lesson Modal */}
          <div className="py-2 px-2 w-full dark:bg-card bg-secondary-foreground mt-3">
            <NewLessonModal courseId={courseId} chapterId={chapter.id} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ChapterCard;
