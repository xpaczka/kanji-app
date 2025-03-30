import { z } from 'zod'

export type SignUpForm = z.infer<typeof signupFormSchema>

export const signupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Must contain at least one special character.',
    })
    .trim(),
})
