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
                    // <Card className="py-0 rounded-sm">
                    //   <Collapsible
                    //     open={chapter.isOpen}
                    //     onOpenChange={() => toggleChapter(chapter.id)}
                    //   >
                    //     <div className="flex items-center justify-between p-3 border-b border-border">
                    //       <div className="flex items-center ">
                    //         <Button
                    //           size={"icon"}
                    //           variant={"ghost"}
                    //           className="cursor-grab opacity-60 hover:opacity-100"
                    //           {...listeners}
                    //         >
                    //           <GripVertical className="size-4" />
                    //         </Button>
                    //         <CollapsibleTrigger asChild>
                    //           <Button
                    //             size={"icon"}
                    //             variant="ghost"
                    //             className="flex items-center"
                    //           >
                    //             {chapter.isOpen ? (
                    //               <ChevronDown className="size-4" />
                    //             ) : (
                    //               <ChevronRight className="size-4" />
                    //             )}
                    //           </Button>
                    //         </CollapsibleTrigger>
                    //         <p className="cursor-pointer hover:text-primary pl-2 font-semibold ">
                    //           {chapter.title[0].toUpperCase() +
                    //             chapter.title.slice(1)}
                    //         </p>
                    //       </div>
                    //       <Button variant={"ghost"} size={"icon"}>
                    //         <Trash2 className="size-4" />
                    //       </Button>
                    //     </div>
                    //     <CollapsibleContent className="dark:bg-sidebar-accent pt-3">
                    //       <SortableContext
                    //         items={chapter.lessons.map((lesson) => lesson.id)}
                    //         strategy={verticalListSortingStrategy}
                    //       >
                    //         {chapter.lessons.map((lesson) => (
                    //           <SortableItem
                    //             key={lesson.id}
                    //             id={lesson.id}
                    //             data={{ type: "lesson", chapterId: chapter.id }}
                    //             className="px-4 "
                    //           >
                    //             {(lessonsListeners) => (
                    //               <div
                    //                 className="flex items-center justify-between p-2
                    //               hover:bg-accent bg-secondary rounded-sm"
                    //               >
                    //                 <div className="flex items-center gap-2 font-medium text-sm">
                    //                   <Button
                    //                     variant={"ghost"}
                    //                     size={"icon"}
                    //                     {...lessonsListeners}
                    //                     className="cursor-move"
                    //                   >
                    //                     <GripVertical className="size-4" />
                    //                   </Button>
                    //                   <FileText className="size-4" />
                    //                   <Link
                    //                     href={`/admin/courses/${data.id}/${chapter.id}/${lesson.id}`}
                    //                   >
                    //                     {lesson.title}
                    //                   </Link>
                    //                 </div>
                    //                 <Button variant={"ghost"} size={"icon"}>
                    //                   <Trash2 className="size-4" />
                    //                 </Button>
                    //               </div>
                    //             )}
                    //           </SortableItem>
                    //         ))}
                    //       </SortableContext>
                    //       <div className="py-2 px-2 w-full dark:bg-card bg-secondary-foreground mt-3">
                    //         <Button
                    //           variant={"outline"}
                    //           className="dark:bg-card bg-secondary-foreground border-0
                    //           text-primary-foreground font-medium text-base cursor-pointer
                    //           hover:bg-inherit dark:hover:bg-inherit hover:text-primary-foreground"
                    //           title="Add new lesson"
                    //         >
                    //           <PlusSquare className="size-4" />
                    //           Lesson
                    //         </Button>
                    //       </div>
                    //     </CollapsibleContent>
                    //   </Collapsible>
                    // </Card>
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
