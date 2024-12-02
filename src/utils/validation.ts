import { z } from 'zod';

export const suiAddressRegex = /^0x[a-fA-F0-9]{64}$/;

export const loginSchema = z.object({
  suiAddress: z.string()
    .regex(suiAddressRegex, 'Invalid SUI wallet address format')
    .min(66, 'SUI wallet address must be 66 characters long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters')
});

export const registerSchema = loginSchema.extend({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;