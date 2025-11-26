import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { constructUrl } from "@/hooks/use-construct-url";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseTableProps {
  courses: AdminCourseType[];
}

// const constructImageUrl = (fileKey: string): string => {
//   return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${fileKey}`;
// };
const ActionButton = ({
  href,
  icon: Icon,
  "aria-label": ariaLabel,
}: {
  href: string;
  icon: React.ComponentType<{ size: number }>;
  "aria-label": string;
}) => (
  <Link
    href={href}
    className={buttonVariants({
      variant: "outline",
      className:
        "cursor-pointer rounded-sm dark:hover:!bg-primary/90 hover:!bg-primary/90",
    })}
    aria-label={ariaLabel}
  >
    <Icon size={20} />
  </Link>
);

export const CourseTable = async ({ courses }: CourseTableProps) => {
  return (
    <Table className="table-fixed min-w-[900px] md:w-full">
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader className="bg-sidebar-accent">
        <TableRow>
          <TableHead className="w-[100px]">Thumbnail</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Level</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-card">
        {courses.map((course) => {
          const imageUrl = constructUrl(course.fileKey);

          return (
            <TableRow key={course.id}>
              <TableCell>
                <Image
                  src={imageUrl}
                  alt={`Thumbnail for course ${course.title}`}
                  width={300}
                  height={200}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell className=" truncate max-w-xs">
                {course.title}
              </TableCell>
              <TableCell className="w-fit truncate">
                {course.smallDescription}
              </TableCell>
              <TableCell>{course.duration}h</TableCell>
              <TableCell>{course.level}</TableCell>
              <TableCell className="space-x-2 text-center">
                <ActionButton
                  href={`/admin/courses/${course.id}/edit`}
                  icon={PencilLine}
                  aria-label={`Edit course ${course.title}`}
                />
                <ActionButton
                  href={`/admin/courses/${course.slug}`}
                  icon={Eye}
                  aria-label={`View course ${course.title}`}
                />
                <ActionButton
                  href={`/admin/courses/${course.id}/delete`}
                  icon={Trash2}
                  aria-label={`Delete course ${course.title}`}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const CourseTableSkeleton = () => {
  return (
    <TableBody className="bg-card">
      <TableRow>
        <TableCell>
          <Skeleton className="h-8 animate-pulse" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 " />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w" />
        </TableCell>
        <TableCell className=" space-x-2 text-center ">
          <Skeleton className={buttonVariants({ variant: "outline" })} />
          <Skeleton className={buttonVariants({ variant: "outline" })} />
          <Skeleton className={buttonVariants({ variant: "outline" })} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
