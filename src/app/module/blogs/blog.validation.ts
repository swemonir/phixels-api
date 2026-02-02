import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required"
    }).min(1, "Title cannot be empty"),
    writer: z.string({
      required_error: "Writer name is required"
    }),
    readingTime: z.string({
      required_error: "Reading time is required"
    }),
    details: z.string({
      required_error: "Details are required"
    }),
    tags: z.preprocess((val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch (e) {
          // If not valid JSON, split by comma and trim
          return val.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        }
      }
      return val;
    }, z.array(z.string()).optional())
  })
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    writer: z.string().optional(),
    readingTime: z.string().optional(),
    details: z.string().optional(),
    tags: z.preprocess((val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch (e) {
          // If not valid JSON, split by comma and trim
          return val.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        }
      }
      return val;
    }, z.array(z.string()).optional())
  })
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema
};
