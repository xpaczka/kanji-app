"use server"

import createSupabaseClient from "#/database/client"
import { SignUpFormSchema } from "#/types"
import { revalidatePath } from "next/cache"

type SignUpProps = {
  username: string
  email: string
  password: string
}

const signUp = async (data: SignUpProps): Promise<{ error: string | null }> => {
  const supabase = await createSupabaseClient()

  const { success, error: validationError } = SignUpFormSchema.safeParse(data)

  if (!success || validationError) {
    return { error: validationError.message }
  }

  // TODO: Validate the inputs
  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      data: {
        username: data.username
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")

  return { error: null }
}

export default signUp
