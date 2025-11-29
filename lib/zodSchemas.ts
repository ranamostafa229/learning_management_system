import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
  "Development",
  "IT & Software",
  "Business",
  "Design",
  "Marketing",
  "Personal Development",
  "Photography",
  "Sales",
  "Writing",
  "Office Productivity",
] as const;

type RichTextNode = string | { text?: string; content?: RichTextNode[] };
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),

  description: z.string().refine(
    (val) => {
      // Handle empty or null values
      if (!val || val.trim() === "") return false;

      try {
        const parsed = JSON.parse(val);
        // Extract text content from the rich text JSON structure
        const extractText = (node: RichTextNode): string => {
          if (typeof node === "string") return node;
          if (typeof node === "object" && node !== null) {
            if (node.text) return node.text;
            if (node.content && Array.isArray(node.content)) {
              return node.content.map(extractText).join("");
            }
          }
          return "";
        };
        const textContent = extractText(parsed);
        return textContent.trim().length >= 3;
      } catch {
        // If not JSON, treat as plain text
        return String(val).trim().length >= 3;
      }
    },
    {
      message: "Description must be at least 3 characters long",
    }
  ),
  fileKey: z.string().min(1, { error: "File is required" }),
  price: z.coerce.number().min(1, { error: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, {
      error: "Duration must be at least 1 hour",
    })
    .max(500, {
      error: "Duration must be at most 500 hours",
    }),
  level: z.enum(courseLevels, {
    error: "Level is required",
  }),
  category: z.enum(courseCategories, {
    error: "Category is required",
  }),
  smallDescription: z
    .string()
    .min(3, {
      error: "Small description must be at least 3 characters long",
    })
    .max(200, {
      error: "Small description must be at most 200 characters long",
    }),
  slug: z.string().min(3, { error: "Slug must be at least 3 characters long" }),
  status: z.enum(courseStatus, {
    error: "Status is required",
  }),
});

export const chapterSchema = z.object({
  name: z.string().min(3, { error: "Name must be at least 3 characters long" }),
  courseId: z.uuid({ error: "Invalid course ID" }),
});

export const lessonSchema = z.object({
  name: z.string().min(3, { error: "Name must be at least 3 characters long" }),
  courseId: z.uuid({ error: "Invalid course ID" }),
  chapterId: z.uuid({ error: "Invalid chapter ID" }),
  description: z
    .string()
    .min(3, { error: "Description must be at least 3 characters long" })
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});
export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { error: "File name is required" }),
  contentType: z.string().min(1, { error: "Content type is required" }),
  size: z.number().min(1, { error: "File size is required" }),
  isImage: z.boolean(),
});
export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
