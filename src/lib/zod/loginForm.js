import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Invalid email format.'),
  password: z
    .string()
    .min(4, 'Password must be at least 8 characters.')
    .max(32, 'Password must not exceed 32 characters.'),
});

export default loginSchema;