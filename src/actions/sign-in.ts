"use server"

import { ROUTES } from "#/constants/router"
import createSupabaseServer from "#/database/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type SignInProps = {
  email: string
  password: string
}

const signIn = async (data: SignInProps) => {
  const supabase = await createSupabaseServer()

  // TODO: Validate the inputs
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // TODO: Add better error handling
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect(ROUTES.mainDashboard)
}

export default signIn
