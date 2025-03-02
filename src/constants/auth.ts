import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }).default(''),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .default(''),
})

export const signUpFormSchema = signInFormSchema.extend({
  username: z
    .string()
    .min(6, { message: 'Username must be at least 6 characters long' })
    .default(''),
})
