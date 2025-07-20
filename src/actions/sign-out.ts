"use server"

import { ROUTES } from "#/constants/router"
import createSupabaseServer from "#/database/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const signOut = async () => {
  const supabase = await createSupabaseServer()

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
