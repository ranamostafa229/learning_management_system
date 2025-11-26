"use client";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useState, useTransition } from "react";
import { DeleteSavedCourses } from "../action";
import { toast } from "sonner";
import ConfirmDialog from "@/components/general/ConfirmDialog";

const RemoveAllCourses = () => {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
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
    <ConfirmDialog
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your
      saved courses."
      confirmText={pending ? "Deleting..." : "Delete"}
      onConfirm={onSubmit}
      confirmDisabled={pending}
      open={open}
      setOpen={setOpen}
      trigger={<Button className="cursor-pointer">Remove All Courses</Button>}
    />
  );
};

export default RemoveAllCourses;
