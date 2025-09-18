import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  preferred_date: z.string().optional().transform(str => str ? new Date(str) : null),
  subscribe: z.boolean().default(false)
});

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    contactSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    }
    next(error);
  }
};
