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
}
const LessonItem = ({ lesson, slug }: Props) => {
  const completed = true;
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "w-full h-auto justify-start transition-all p-2.5",
          completed &&
            "!bg-green-100 dark:!bg-green-900/30 !border-green-300 dark:!border-green-900 hover:!bg-green-200 dark:hover:!bg-green-900/50 !text-green-900 dark:!text-green-200"
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
              "size-5 rounded-full bg-card dark:bg-background  flex justify-center items-center "
            )}
          >
            <Play className={cn("size-2.5 fill-current")} />
          </div>
        )}
        {/* lesson title */}
        <div className="flex-1 text-left min-w-0 ">
          <p
            className={cn(
              "text-[13px] font-medium truncate",
              completed && "text-green-800 dark:text-green-200"
            )}
          >
            {lesson.posititon}: {lesson.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LessonItem;
