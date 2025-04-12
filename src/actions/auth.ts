"use server"

import bcrypt from "bcryptjs"
import { database } from "#/database"
import { userTable } from "#/database/schema"
import {
  SignInForm,
  signInFormSchema,
  SignUpForm,
  signUpFormSchema,
} from "#/schemas/auth"
import { createSession, deleteSession } from "#/lib/session"
import { redirect } from "next/navigation"
import { ROUTES } from "#/constants/router"

export const signIn = async (formData: SignInForm) => {
  const { email, password } = formData

  // Validate sign in form fields
  const validatedFields = signInFormSchema.safeParse({
    email,
    password,
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  // Find user in database by email

  // Decrypt user password

  // Create user session

  // Redirect user to dashboard
  redirect(ROUTES.mainDashboard)
}

export const signUp = async (formData: SignUpForm) => {
  const { email, username, password } = formData

  // Validate sign up form fields
  const validatedFields = signUpFormSchema.safeParse({
    email,
    username,
    password,
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  // Prepare data for insertion into database
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Insert user into database
  const data = await database
    .insert(userTable)
    .values({ username, email, password: hashedPassword })
    .returning({
      id: userTable.id,
      username: userTable.username,
      email: userTable.email,
    })

  const user = data[0]

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    }
  }

  // Create user session
  await createSession(user.id)

  // Redirect user to dashboard
  redirect(ROUTES.mainDashboard)
}

export const logout = async () => {
  await deleteSession()
  redirect("/")
}
