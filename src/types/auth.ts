import { z } from "zod"

// Schemas
export const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email." })
  .trim()

export const UsernameSchema = z
  .string()
  .min(6, { message: "Name must be at least 6 characters long." })
  .trim()

export const PasswordSchema = z
  .string()
  .min(8, { message: "Must be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
  .regex(/[0-9]/, { message: "Must contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Must contain at least one special character."
  })
  .trim()

export const SignInFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema
})

export const SignUpFormSchema = z.object({
  email: EmailSchema,
  username: UsernameSchema,
  password: PasswordSchema
})

// Types
export type SignInForm = z.infer<typeof SignInFormSchema>
export type SignUpForm = z.infer<typeof SignUpFormSchema>
