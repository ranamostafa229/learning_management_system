"use client";
import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { constructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: EnrolledCourseType["course"];
}

const CourseProgressCard = ({ data }: Props) => {
  const imageUrl = constructUrl(data.fileKey);
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: data });
  return (
    <Card className="relative group py-0 gap-0 hover:cursor-pointer rounded-sm ">
      <Badge className="absolute right-3 top-5 z-10  h-6 w-24 rounded-none font-bold uppercase">
        {data.level}
      </Badge>
      {/*  Triangle for level badge */}
      <div
        className=" absolute  top-5 right-24 mr-3 z-10
            border-t-[12px] border-b-[12px] border-r-[11px] 
            border-t-transparent border-b-transparent border-r-primary"
      />
      <Link href={`/dashboard/${data.slug}`} className="relative">
        <Image
          src={imageUrl}
          alt={`Thumbnail for course ${data.title}`}
          width={600}
          height={400}
          className="w-full h-full p-3 rounded-t-xl aspect-video object-cover "
        />
        {/* play icon when hover */}
        <div
          className="hidden group-hover:flex absolute z-10 inset-0 m-auto text-white
        bg-[#3E4143]/85 w-14 h-14 rounded-full justify-center items-center"
        >
          <Play />
        </div>
        {/* duration badge */}
        <Badge className="absolute right-5 bottom-5 rounded-sm bg-[#3E4143]/85 h-6 w-20 z-10">
          {data.duration} hours
        </Badge>
      </Link>
      <CardContent className="p-4">
        <Link
          href={`/dashboard/${data.slug}`}
          className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm">
            <p>Progress:</p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgressCard;
