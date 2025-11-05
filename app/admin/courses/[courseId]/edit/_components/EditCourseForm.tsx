"use client";
import { tryCatch } from "@/hooks/try-catch";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkle } from "lucide-react";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import Uploader from "@/components/file-uploader/Uploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import { editCourse } from "../actions";
import { useRouter } from "next/navigation";

interface Props {
  data: AdminCourseSingularType;
}
const EditCourseForm = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      fileKey: data.fileKey,
      price: data.price,
      duration: data.duration,
      level: data.level,
      category: data.category as CourseSchemaType["category"],
      smallDescription: data.smallDescription,
      status: data.status,
      slug: data.slug,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: CourseSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values, data.id)
      );
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        router.push("/admin/courses");
      } else {
        toast.error(result.message || "Failed to create course.");
      }
    });
  }
  const generateSlug = () => {
    const titleValue = form.getValues("title");

    const slug = slugify(titleValue);
    form.setValue("slug", slug, { shouldValidate: true });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Course title here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Course Slug</FormLabel>
              <div className="flex items-center gap-2 ">
                <FormControl>
                  <Input placeholder="Course slug here" {...field} />
                </FormControl>
                <Button
                  type="button"
                  onClick={generateSlug}
                  title="Generate Slug"
                >
                  Generate Slug
                  <Sparkle className="ml-1 " />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Course description here"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  onChange={(content) => {
                    field.onChange(content);
                    // Trigger validation after content change
                    form.trigger("description");
                  }}
                  initialContent={field.value}
                  placeholder="Start writing your content..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileKey"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Course thumbnai</FormLabel>
              <Uploader
                onChange={field.onChange}
                value={field.value}
                action="edit"
                fileTypeAccepted="image"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Course Category</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl title="Course Category">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Course Level</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl title="Course Level">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full">
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl title="Duration">
                  <Input
                    placeholder="Course duration here"
                    type="number"
                    {...field}
                    value={
                      typeof field.value === "number" ||
                      typeof field.value === "string"
                        ? field.value
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full">
                <FormLabel>Price ($)</FormLabel>
                <FormControl title="Price">
                  <Input
                    placeholder="Course price here"
                    type="number"
                    {...field}
                    value={
                      typeof field.value === "number" ||
                      typeof field.value === "string"
                        ? field.value
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Course Status</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl title="Course Status">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courseStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                Saving... <Loader2 className="animate-spin ml-1" />
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCourseForm;
