"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "../SortableItem";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import { LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChapterCard from "./ChapterCard";

interface Props {
  data: AdminCourseSingularType;
}
export default function CourseStructure({ data }: Props) {
  const initialItems =
    data?.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true, // default chapters to be open
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.posititon,
      })),
    })) || [];
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  const toggleChapter = (chapterId: string) => {
    setItems(
      items.map((item) =>
        item.id === chapterId
          ? {
              ...item,
              isOpen: !item.isOpen,
            }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <Card className="dark:bg-sidebar-accent rounded-sm py-4 ">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg flex gap-2">
            <LayoutList />
            Chapters
          </CardTitle>
          <Button className="rounded-sm cursor-pointer dark:hover:!bg-primary/90 hover:!bg-accent-foreground">
            New Chapter
          </Button>
        </CardHeader>
      </Card>
      {items.length > 0 && (
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={rectIntersection}
          sensors={sensors}
        >
          <div className="space-y-10 ">
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((chapter) => (
                <SortableItem
                  key={chapter.id}
                  id={chapter.id}
                  data={{ type: "chapter" }}
                >
                  {(listeners) => (
                    <ChapterCard
                      chapter={chapter}
                      courseId={data.id}
                      listeners={listeners}
                      toggleChapter={toggleChapter}
                    />
                  )}
                </SortableItem>
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}
    </div>
  );
}
