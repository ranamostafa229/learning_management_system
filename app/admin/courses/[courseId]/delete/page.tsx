"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import { Delete, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteCourse } from "./actions";
import { toast } from "sonner";

const DeleteCourseRoute = () => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
      if (result?.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <h1 className="flex font-medium text-xl gap-3 items-center">
        <Delete size={20} />
        Delete Course
      </h1>
      <div className="flex flex-col gap-10 max-w-sm sm:max-w-2xl mx-auto w-full">
        <Card className="mt-24">
          <CardHeader>
            <CardTitle>Are you sure you want to delete this course?</CardTitle>
            <CardDescription>This action cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Link
              href={"/admin/courses"}
              className={buttonVariants({ variant: "outline" })}
            >
              Cancel
            </Link>
            <Button onClick={onSubmit} disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeleteCourseRoute;
