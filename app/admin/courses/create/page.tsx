"use client";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgePlus, Info, Loader2, Sparkle } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import Uploader from "@/components/file-uploader/Uploader";
import { tryCatch } from "@/hooks/try-catch";
import { CreateCourse } from "./actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti";

const CourseCreatingPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { triggerConfetti } = useConfetti();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      category: "Development",
      smallDescription: "",
      status: "Draft",
      slug: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: CourseSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(CreateCourse(values));
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
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
    <div className="flex flex-col gap-10">
      <h1 className="flex font-medium text-xl gap-3 items-center">
        <BadgePlus />
        Create New Course
      </h1>
      <div className="flex flex-col gap-11">
        <h2 className="flex text-lg font-medium gap-3 items-center">
          <Info size={20} />
          Basic Information
        </h2>
        <Card className="rounded-sm">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                        action="create"
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
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
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
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      Creating... <Loader2 className="animate-spin ml-1" />
                    </>
                  ) : (
                    "Create Course"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseCreatingPage;
