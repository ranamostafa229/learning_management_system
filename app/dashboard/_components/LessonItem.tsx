import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Play } from "lucide-react";
import Link from "next/link";

interface Props {
  lesson: {
    title: string;
    posititon: number;
    id: string;
  };
  slug: string;
  isActive?: boolean;
  completed: boolean;
}
const LessonItem = ({ lesson, slug, isActive, completed }: Props) => {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "w-full h-auto justify-start transition-all p-2.5",
          completed &&
            "!bg-green-100 dark:!bg-green-900/30 !border-green-300 dark:!border-green-900 hover:!bg-green-200 dark:hover:!bg-green-900/50 !text-green-900 dark:!text-green-200",
          isActive &&
            !completed &&
            "bg-primary/10 dark:bg-primary/20 !border-primary/50 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary"
        ),
      })}
    >
      <div className="flex gap-2 items-center w-full min-w-0">
        {/* icon */}
        {completed ? (
          <div className="size-5 bg-green-500 dark:bg-green-600 flex items-center justify-center rounded-full">
            <Check className="size-3 text-white" />
          </div>
        ) : (
          <div
            className={cn(
              "size-5 rounded-full bg-card dark:bg-background  flex justify-center items-center border-2",
              isActive
                ? "!border-primary bg-primary/10 dark:bg-primary/20"
                : "!border-muted-foreground/60"
            )}
          >
            <Play
              className={cn(
                "size-2.5 fill-current",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
        )}
        {/* lesson title */}
        <div className="flex-1 text-left min-w-0 ">
          <p
            className={cn(
              "text-[13px] font-medium truncate",
              completed
                ? "text-green-800 dark:text-green-200"
                : isActive
                ? "text-primary font-semibold"
                : "text-foreground"
            )}
          >
            {lesson.posititon}: {lesson.title}
          </p>
          {isActive && !completed && (
            <p className="text-[10px] text-primary font-medium">
              Currently Watching
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LessonItem;
