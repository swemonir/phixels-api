import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    icon: z.string({ required_error: 'Icon is required' }),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const ServiceValidation = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
