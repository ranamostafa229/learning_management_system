import { size, z } from "zod";
import { is } from "zod/v4/locales";

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

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .transform((val) => {
      try {
        const parsed = JSON.parse(val);
        return parsed.text ?? "";
      } catch {
        return "";
      }
    })
    .superRefine((val, ctx) => {
      if (val.length < 3) {
        ctx.addIssue({
          code: "too_small",
          minimum: 3,
          type: "string",
          inclusive: true,
          message: "Description must be at least 3 characters long",
          origin: "string",
        });
      }
    }),

  // description: z
  //   .string()
  //   .min(3, { error: "Description must be at least 3 characters long" }),
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
export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { error: "File name is required" }),
  contentType: z.string().min(1, { error: "Content type is required" }),
  size: z.number().min(1, { error: "File size is required" }),
  isImage: z.boolean(),
});
export type CourseSchemaType = z.infer<typeof courseSchema>;
