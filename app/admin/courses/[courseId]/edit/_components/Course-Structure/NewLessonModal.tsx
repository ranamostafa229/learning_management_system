import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createLesson } from "../../actions";
import { toast } from "sonner";
import { PlusSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const NewLessonModal = ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      chapterId: chapterId,
      courseId: courseId,
    },
  });
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  const onSubmit = async (values: LessonSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(values));
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        setIsOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="dark:bg-card bg-secondary-foreground border-0 
                              text-primary-foreground font-medium text-base cursor-pointer 
                              hover:bg-inherit dark:hover:bg-inherit hover:text-primary-foreground"
          title="Add new lesson"
        >
          <PlusSquare className="size-4" />
          Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                {pending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLessonModal;
