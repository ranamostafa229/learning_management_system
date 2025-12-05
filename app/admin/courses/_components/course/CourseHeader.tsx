import { buttonVariants } from "@/components/ui/button";
import { Book } from "lucide-react";
import Link from "next/link";

export const CourseHeader = () => {
  return (
    <>
      <h2 className="flex items-center gap-2 text-xl font-medium">
        <Book size={20} />
        Courses
      </h2>
      <div
        className="bg-card flex flex-wrap sm:flex-nowrap gap-5 sm:gap-0  justify-center
      sm:justify-between items-center p-5 sm:p-7 "
      >
        <h1 className="text-lg sm:text-xl md:text-2xl flex gap-4 items-center">
          <Book size={25} className="text-[#686f7a] flex-shrink-0" />
          Jump Into Course Creation
        </h1>
        <Link
          href="/admin/courses/create"
          className={buttonVariants({
            variant: "default",
            className:
              "cursor-pointer rounded-sm dark:hover:!bg-primary/90 hover:!bg-accent-foreground",
          })}
        >
          Create Your Course
        </Link>
      </div>
    </>
  );
};
