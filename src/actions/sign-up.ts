"use server"

import { ROUTES } from "#/constants/router"
import createSupabaseServer from "#/database/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type SignUpProps = {
  username: string
  email: string
  password: string
}

const signUp = async (data: SignUpProps) => {
  const supabase = await createSupabaseServer()

  // TODO: Validate the inputs
  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      // TODO: Reevalute username setting
      data: {
        username: data.username
      }
    }
  })

  if (error) {
    // TODO: Add better error handling
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect(ROUTES.mainDashboard)
}

export default signUp
