"use server"

import bcrypt from "bcryptjs"
import {
  AuthPayload,
  SignInForm,
  signInFormSchema,
  SignUpForm,
  signUpFormSchema
} from "#/schemas/auth"
import { createSession, deleteSession } from "#/lib/session"
import { redirect } from "next/navigation"
import { ROUTES } from "#/constants/router"
import { createNewUser, getUserByEmail } from "#/database/queries"
import { ZodSchema } from "zod"

const validateCredentials = <T>(schema: ZodSchema<T>, formData: T) => {
  const { success } = schema.safeParse(formData)
  return success
}

const authorizeAndRedirect = async (userId: string) => {
  await createSession(userId)
  redirect(ROUTES.knowledgeTest)
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const signIn = async (formData: SignInForm): Promise<AuthPayload> => {
  const validCredentials = validateCredentials(signInFormSchema, formData)
  if (!validCredentials) return { success: false }

  // Find user in database by email
  const { email, password } = formData
  const user = await getUserByEmail(email)

  if (!user) {
    return {
      success: false,
      errorMessage: "User with this email does not exist"
    }
  }

  if (!(await comparePassword(password, user.password))) {
    return { success: false, errorMessage: "Invalid email or password" }
  }

  // Authorize user
  await authorizeAndRedirect(user.id)

  return { success: true }
}

export const signUp = async (formData: SignUpForm): Promise<AuthPayload> => {
  const validCredentials = validateCredentials(signUpFormSchema, formData)
  if (!validCredentials) return { success: false }

  // Prepare data for insertion into database
  const { email, username, password } = formData
  const hashedPassword = await hashPassword(password)

  // Insert user into database
  const user = await createNewUser(username, email, hashedPassword)

  if (!user) {
    return { success: false, errorMessage: "Failed to create account" }
  }

  // Authorize user
  await authorizeAndRedirect(user.id)

  return { success: true }
}

export const signOut = async () => {
  await deleteSession()
  redirect(ROUTES.index)
}
