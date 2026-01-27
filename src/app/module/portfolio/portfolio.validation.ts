import { z } from "zod";

const createPortfolioValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    client: z.string({
      required_error: "Client is required",
    }),
    category: z.string({
      required_error: "Category is required",
    }),
    details: z.string({
      required_error: "Details is required",
    }),
    technology: z.array(z.string(), {
      required_error: "Technology is required",
    }),
    activeUsers: z.string({
      required_error: "Active Users is required",
    }),
    image: z.string({
      required_error: "Image link is required",
    }),
    liveLink: z.string({
      required_error: "Live link is required",
    }),
  }),
});

const updatePortfolioValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    client: z.string().optional(),
    category: z.string().optional(),
    details: z.string().optional(),
    technology: z.array(z.string()).optional(),
    activeUsers: z.string().optional(),
    image: z.string().optional(),
    liveLink: z.string().optional(),
  }),
});

export const PortfolioValidation = {
  createPortfolioValidationSchema,
  updatePortfolioValidationSchema,
};
