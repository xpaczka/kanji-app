"use server"

import createSupabaseClient from "#/database/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type SignUpProps = {
  username: string
  email: string
  password: string
}

const signUp = async (data: SignUpProps) => {
  const supabase = await createSupabaseClient()

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
}

export default signUp
