"use client";
import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronsDown, Play } from "lucide-react";
import LessonItem from "./LessonItem";
import { usePathname } from "next/navigation";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { useEffect } from "react";

interface Props {
  course: CourseSidebarDataType["course"];
}
const CourseSidebar = ({ course }: Props) => {
  const pathname = usePathname();
  const currentLessonId = pathname.split("/").pop(); // to get the last part of the url
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: course });

  const isLg = useMediaQuery("(min-width:1024px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isLg);
  }, [isLg]);
  return (
    <div className="flex flex-col h-full">
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="border-b border-border pb-4 pr-4 space-y-2 flex flex-col w-full"
      >
        <CollapsibleTrigger>
          {/* Course info */}
          <div className="flex space-y-2 gap-2 items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="size-10 flex items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Play className="size-5 text-primary" />
              </div>
              <div className="flex lg:flex-1 min-w-0">
                <h1 className="font-semibold text-base leading-tight truncate">
                  {course.title}
                </h1>
              </div>
            </div>
            <div className="shrink-0">
              <ChevronDown className="size-5 text-primary" />
            </div>
          </div>

          {/* progress bar */}
          <div className="space-y-2 pl-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {completedLessons}/{totalLessons} lessons
              </span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
            <p className="text-xs text-muted-foreground text-left">
              {progressPercentage}% complete
            </p>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* chapter list with lessons */}
          <div className="space-y-3 py-4 pr-4 ">
            {course.chapter.map((chapter, index) => (
              <Collapsible
                key={chapter.id}
                defaultOpen={index === 0}
                className="space-y-2"
              >
                {/* chapter header */}
                <CollapsibleTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="flex h-auto w-full items-center gap-2 p-3 cursor-pointer "
                  >
                    <div className=" shrink-0">
                      <ChevronsDown className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {chapter.position}: {chapter.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-medium truncate">
                        {chapter.lessons.length} lessons
                      </p>
                    </div>
                  </Button>
                </CollapsibleTrigger>
                {/* chapter lessons */}
                <CollapsibleContent className="pl-3 space-y-2 border-l-2 ml-1">
                  {chapter.lessons.map((lesson) => (
                    <LessonItem
                      lesson={lesson}
                      slug={course.slug}
                      key={lesson.id}
                      isActive={currentLessonId === lesson.id}
                      completed={
                        lesson.lessonProgress.find(
                          (progress) => progress.lessonId === lesson.id
                        )?.completed || false
                      }
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CourseSidebar;
