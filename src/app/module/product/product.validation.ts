import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    features: z.array(z.string()).optional(),
    pricing: z.number({ required_error: 'Pricing is required' }),
    demoLink: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string({ required_error: 'Category is required' }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    pricing: z.number().optional(),
    demoLink: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
