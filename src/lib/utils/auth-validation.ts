import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password must be less than 72 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
});

export type AuthFormData = z.infer<typeof authSchema>;