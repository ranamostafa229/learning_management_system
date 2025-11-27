"use client";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { tryCatch } from "@/hooks/try-catch";
import { constructUrl } from "@/hooks/use-construct-url";
import { BookmarkPlus, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { ToggleSavedCourses } from "../courses/action";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  data: PublicCourseType;
  saved?: boolean;
  orientation?: "vertical" | "horizontal";
  revalidatePath?: string;
}

const PublicCourseCard = ({
  data,
  saved,
  orientation,
  revalidatePath,
}: Props) => {
  const imageUrl = constructUrl(data.fileKey);
  const [pending, startTransition] = useTransition();
  const [savedCourse, setSavedCourse] = useState(saved);

  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        ToggleSavedCourses(data.id, revalidatePath)
      );
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        setSavedCourse(!savedCourse);
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card
      className={cn(
        "relative group py-0 gap-0 hover:cursor-pointer rounded-sm",
        orientation === "horizontal" ? "flex flex-row " : "flex flex-col"
      )}
    >
      {/* Thumbnail with play icon and info */}
      <Link href={`/courses/${data.slug}`} className="relative">
        <Image
          src={imageUrl}
          alt={`Thumbnail for course ${data.title}`}
          width={600}
          height={400}
          className={cn(
            " p-3 rounded-t-xl",
            orientation === "horizontal" && "w-full h-48",
            orientation === "vertical" && "w-full h-full  object-cover"
          )}
        />
        <Badge className="absolute right-3 top-5 z-10  h-6 w-24 rounded-none font-bold uppercase">
          {data.level}
        </Badge>
        {/*  Triangle for badge */}
        <div
          className=" absolute  top-5 right-24 mr-3 z-10
            border-t-[12px] border-b-[12px] border-r-[11px] 
            border-t-transparent border-b-transparent border-r-primary"
        />
        {/* play icon when hover */}
        <div
          className="hidden group-hover:flex absolute z-10 inset-0 m-auto text-white
        bg-[#3E4143]/85 w-14 h-14 rounded-full justify-center items-center"
        >
          <Play />
        </div>
        <Badge className="absolute right-5 bottom-5 rounded-sm bg-[#3E4143]/85 h-6 w-20 z-10">
          {data.duration} hours
        </Badge>
      </Link>
      <CardContent className="p-4 space-y-1.5 w-full">
        <div className="flex items-center justify-between ">
          <Link
            href={`/courses/${data.slug}`}
            className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors"
          >
            {data.title}
          </Link>
          <Button
            className={cn(
              " flex size-7 rounded-sm bg-accent items-center justify-center cursor-pointer  text-muted-foreground  hover:!text-white dark:text-white transition-colors ",
              savedCourse && "bg-primary"
            )}
            disabled={pending}
            onClick={onSubmit}
          >
            <BookmarkPlus
              size={17}
              className={cn(savedCourse && "text-white")}
              aria-label="Add to bookmarks"
            />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">{data.category}</span>
          <span className="text-lg font-medium">${data.price}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicCourseCard;

export const PublicCourseCardSkeleton = () => {
  return (
    <Card className="relative group py-0 gap-0  rounded-sm ">
      <Skeleton className="absolute right-3 top-5 z-10  h-6 w-20" />
      {/*  Triangle for badge */}
      <div
        className=" absolute  top-5 right-20 mr-3 z-10
            border-t-[12px] border-b-[12px] border-r-[11px] 
            border-t-transparent border-b-transparent dark:border-r-border/60 border-r-accent"
      />

      <Skeleton className="absolute right-5 bottom-28 rounded-sm dark:bg-[#3E4143]/85 bg-accent h-6 w-20 z-10" />
      <div className="relative p-3">
        <Skeleton className="w-full h-48 p-3 rounded-t-xl  " />
      </div>
      <CardContent className="p-4 space-y-3">
        <Skeleton className="w-36 h-7" />

        <div className="flex items-center justify-between">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-16 h-5" />
        </div>
      </CardContent>
    </Card>
  );
};
