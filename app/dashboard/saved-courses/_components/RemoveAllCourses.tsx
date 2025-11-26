"use client";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { DeleteSavedCourses } from "../action";
import { toast } from "sonner";

const RemoveAllCourses = () => {
  const [pending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(DeleteSavedCourses());
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button onClick={onSubmit} disabled={pending}>
      Remove All Courses
    </Button>
  );
};

export default RemoveAllCourses;
