"use client";
import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import Uploader from "@/components/file-uploader/Uploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tryCatch } from "@/hooks/try-catch";
import { cn } from "@/lib/utils";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Video } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateLesson } from "../../[courseId]/[chapterId]/[lessonId]/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createLesson } from "../../[courseId]/edit/actions";

interface Props {
  initialData?: AdminLessonType;
  action: "edit" | "create";
  courseId: string;
  chapterId: string;
  openModal?: (open: boolean) => void;
}

const LessonForm = ({
  initialData,
  action,
  courseId,
  chapterId,
  openModal,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: initialData?.title || "",
      description: initialData?.description ?? undefined,
      thumbnailKey: initialData?.thumbnailKey ?? undefined,
      videoKey: initialData?.videoKey ?? undefined,
      courseId: courseId,
      chapterId: chapterId,
    },
  });
  const onSubmit = (values: LessonSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        action === "edit"
          ? updateLesson(values, initialData!.id)
          : createLesson(values)
      );
      if (error) {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
      if (result?.status === "success") {
        toast.success(result.message);
        if (action === "edit") router.push(`/admin/courses/${courseId}/edit`);
        else if (action === "create") {
          form.reset();
          openModal?.(false);
        }
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card
      className={cn(
        "rounded-md",
        action === "create" && "max-w-xs sm:max-w-2xl"
      )}
    >
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              defaultValue="Basic"
              className={cn(
                "py-2 gap-5 ",
                action === "create" && "min-h-[480px]"
              )}
            >
              <TabsList className="w-full h-12 ">
                <TabsTrigger
                  value="Basic"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-white py-4 "
                >
                  <FileText className="size-5" />
                  Basic
                </TabsTrigger>
                <TabsTrigger
                  value="Media"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-white py-4 "
                >
                  <Video fill="currentColor" className="size-5" />
                  Media
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Basic" className="space-y-7 px-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Lesson Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Title Here" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Description</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          initialContent={field.value}
                          onChange={(content) => field.onChange(content)}
                          height="96"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent
                value="Media"
                className={cn(
                  action === "create"
                    ? "space-y-4  md:flex md:space-y-0  gap-4  "
                    : "space-y-7"
                )}
              >
                <FormField
                  name="thumbnailKey"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">Video Poster</FormLabel>
                      <FormControl className="">
                        <Uploader
                          {...field}
                          action={action}
                          fileTypeAccepted="image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="videoKey"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">Video File</FormLabel>
                      <FormControl>
                        <Uploader
                          {...field}
                          action={action}
                          fileTypeAccepted="video"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-4">
              <Button disabled={pending} type="submit">
                {pending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LessonForm;
