"use server"

import createSupabaseClient from "#/database/client"
import { SignInFormSchema } from "#/types"
import { revalidatePath } from "next/cache"

type SignInProps = {
  email: string
  password: string
}

const signIn = async (data: SignInProps): Promise<{ error: string | null }> => {
  const supabase = await createSupabaseClient()

  const { success, error: validationError } = SignInFormSchema.safeParse(data)

  if (!success || validationError) {
    return { error: validationError.message }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")

  return { error: null }
}

export default signIn
