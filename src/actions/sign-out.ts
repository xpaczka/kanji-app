"use server"

import { ROUTES } from "#/constants/router"
import createSupabaseClient from "#/database/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const signOut = async () => {
  const supabase = await createSupabaseClient()

  // Check if user is logged in
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath("/", "layout")
  redirect(ROUTES.index)
}

export default signOut
