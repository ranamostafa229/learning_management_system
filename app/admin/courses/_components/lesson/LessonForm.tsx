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

interface Props {
  initialData?: AdminLessonType;
  action: "edit" | "create";
  courseId: string;
  chapterId: string;
}

const LessonForm = ({ initialData, action, courseId, chapterId }: Props) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: initialData?.title,
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
        updateLesson(values, initialData!.id)
      );
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
      if (result?.status === "success") {
        toast.success(result.message);
        router.push(`/admin/courses/${courseId}/edit`);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card className="rounded-md">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="Basic" className="py-2 gap-5">
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
                      <FormLabel className="text-base">Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent
                value="Media"
                className={cn("space-y-7", action === "create" && "flex")}
              >
                <FormField
                  name="thumbnailKey"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Video Poster</FormLabel>
                      <FormControl>
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
                    <FormItem>
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
