import { z } from 'zod';

const createCareerValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string({ required_error: 'Job Title is required' }),
    jobType: z.enum(
      ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'],
      { required_error: 'Job Type is required' }
    ),
    location: z.string({ required_error: 'Location is required' }),
    description: z.string({ required_error: 'Description is required' }),
    requirements: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    salaryRange: z.string().optional(),
    deadline: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
    applicationLink: z.string().optional(),
    applicationEmail: z.string().email().optional(),
  }),
});

const updateCareerValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string().optional(),
    jobType: z
      .enum(['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'])
      .optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    salaryRange: z.string().optional(),
    deadline: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
    applicationLink: z.string().optional(),
    applicationEmail: z.string().email().optional(),
  }),
});

export const CareerValidation = {
  createCareerValidationSchema,
  updateCareerValidationSchema,
};
