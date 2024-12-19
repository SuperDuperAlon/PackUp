import { z } from 'zod';

const signupSchema = z.object({
    username: z
        .string()
        .min(2, 'Username must be at least 2 characters.')
        .max(20, 'Username must not exceed 20 characters.')
        .regex(
            /^[\u0590-\u05FFa-zA-Z0-9_]+$/,
            'Username can only contain Hebrew letters, English letters, numbers, and underscores.'
        ),
    email: z
        .string()
        .min(1, 'Email is required.')
        .email('Invalid email format.'),
    password: z
        .string()
        .min(4, 'Password must be at least 4 characters.')
        .max(32, 'Password must not exceed 32 characters.')
        // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        // .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .regex(/[0-9]/, 'Password must contain at least one number.')
    // .regex(/[\W_]/, 'Password must contain at least one special character.')
});

export default signupSchema;