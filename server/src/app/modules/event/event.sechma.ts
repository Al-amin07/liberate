import z from 'zod';

const createEventSchema = z.object({
  body: z.object({
    title: z.string({ error: 'Title is required' }).min(1, 'Title is required'),
    date: z.string({ error: 'Date is required' }).regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in YYYY-MM-DD format',
    }),
    time: z
      .string({ error: 'Time is required' })
      .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
    notes: z.string().optional(),
    category: z.enum(['Work', 'Personal', 'Other']).optional(),
    archived: z.boolean().default(false),
  }),
});

const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
      .optional(),
    time: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
      .optional(),
    notes: z.string().optional(),
    //   category: z.enum(['Work', 'Personal', 'Other']).optional(),
    archived: z.boolean().optional(),
  }),
});

export const EventSchema = {
  createEventSchema,
  updateEventSchema,
};
