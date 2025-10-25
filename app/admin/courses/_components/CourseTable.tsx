import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConstructUrl } from "@/hooks/use-construct-url";
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

export const CourseTable = ({ courses }: CourseTableProps) => {
  if (courses.length === 0) {
    return (
      <div className="bg-card p-8 text-center">
        <p className="text-muted-foreground">
          No courses found. Create your first course to get started!
        </p>
      </div>
    );
  }

  return (
    <Table>
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
      {courses.map((course) => {
        const imageUrl = useConstructUrl(course.fileKey);

        return (
          <TableBody className="bg-card" key={course.id}>
            <TableRow>
              <TableCell>
                <Image
                  src={imageUrl}
                  alt={`Thumbnail for course ${course.title}`}
                  width={300}
                  height={200}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{course.title}</TableCell>
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
            <TableRow className="border-b border-border last:border-0" />
          </TableBody>
        );
      })}
    </Table>
  );
};

