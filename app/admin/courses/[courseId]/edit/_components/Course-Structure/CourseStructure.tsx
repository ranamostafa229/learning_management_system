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
import { useEffect, useMemo, useState } from "react";
import { SortableItem } from "../SortableItem";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import { LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChapterCard from "./ChapterCard";
import { toast } from "sonner";
import { reorderChapters, reorderLessons } from "../../actions";
import NewChapterModal from "./NewChapterModal";

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
    if (!over || active.id === over.id) {
      return;
    }
    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overType = over.data.current?.type as "chapter" | "lesson";
    const courseId = data.id;

    if (activeType === "chapter") {
      let targetChapterId = null;
      if (overType === "chapter") {
        targetChapterId = overId;
      } else if (overType === "lesson") {
        targetChapterId = over.data.current?.chapterId;
      }
      if (!targetChapterId) {
        toast.error("Could not determine target chapter for reordering");
        return;
      }
      const oldIndex = items.findIndex((chapter) => chapter.id === activeId);
      const newIndex = items.findIndex(
        (chapter) => chapter.id === targetChapterId
      );
      if (oldIndex === -1 || newIndex === -1) {
        toast.error("Could not find chapter old or new index for reordering");
        return;
      }
      const reordedLocalChapters = arrayMove(items, oldIndex, newIndex);
      const updatedChapterForState = reordedLocalChapters.map(
        (chapter, index) => ({
          ...chapter,
          order: index + 1,
        })
      );
      const previousItems = [...items];
      setItems(updatedChapterForState);
      if (courseId) {
        const chaptersToUpdate = updatedChapterForState.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));
        const reorderChaptersPromise = () =>
          reorderChapters(courseId, chaptersToUpdate);
        toast.promise(reorderChaptersPromise(), {
          loading: "Reordering chapters...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder chapters";
          },
        });
      }
      return;
    }

    if (activeType === "lesson" && overType === "lesson") {
      const activeChapterId = active.data.current?.chapterId;
      const overChapterId = over.data.current?.chapterId;
      if (!activeChapterId || activeChapterId !== overChapterId) {
        toast.error("Lessons must be in the same chapter for reordering");
        return;
      }
      const chapterIndex = items.findIndex(
        (chapter) => chapter.id === activeChapterId
      );
      if (chapterIndex === -1) {
        toast.error("Could not find chapter for lesson reordering");
        return;
      }
      const chapterToUpdate = items[chapterIndex];

      const oldLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === activeId
      );
      const newLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === overId
      );
      if (oldLessonIndex === -1 || newLessonIndex === -1) {
        toast.error("Could not find lesson for reordering");
        return;
      }
      const reordedLessons = arrayMove(
        chapterToUpdate.lessons,
        oldLessonIndex,
        newLessonIndex
      );
      const updatedLessonForState = reordedLessons.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));

      const newItems = [...items];
      newItems[chapterIndex] = {
        ...chapterToUpdate,
        lessons: updatedLessonForState,
      };
      const previousItems = [...items];
      setItems(newItems);

      if (courseId) {
        const lessonsToUpdate = updatedLessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));
        const reorderLessonsPromise = () =>
          reorderLessons(courseId, activeChapterId, lessonsToUpdate);
        toast.promise(reorderLessonsPromise(), {
          loading: "Reordering lessons...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder lessons";
          },
        });
      }
      return;
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
  useEffect(() => {
    setItems((prevItems) => {
      const updatedItems =
        data.chapter.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          order: chapter.position,
          isOpen:
            prevItems.find((item) => item.id === chapter.id)?.isOpen ?? true, // to preserve open state when new server data arrives
          lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.posititon,
          })),
        })) || [];
      return updatedItems;
    });
  }, [data]);

  return (
    <div className="flex flex-col gap-10">
      <Card className="dark:bg-sidebar-accent rounded-sm py-4 ">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg flex gap-2">
            <LayoutList />
            Chapters
          </CardTitle>
          {/* New chapter modal */}
          <NewChapterModal courseId={data.id} />
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
