import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteLesson } from "../../actions";
import { toast } from "sonner";
import ConfirmDialog from "@/components/general/ConfirmDialog";

interface Props {
  courseId: string;
  chapterId: string;
  lessonId: string;
}
const DeleteLesson = ({ courseId, chapterId, lessonId }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteLesson(courseId, chapterId, lessonId)
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        setOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <ConfirmDialog
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your
            lesson."
      confirmText={pending ? "Deleting..." : "Delete"}
      onConfirm={onSubmit}
      confirmDisabled={pending}
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant={"ghost"} size={"icon"} className="cursor-pointer">
          <Trash2 className="size-4" />
        </Button>
      }
    />
  );
};

export default DeleteLesson;
