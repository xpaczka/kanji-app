import { User } from "@supabase/supabase-js"
import { SupabaseDbClient, UserPreferences } from "#/types"

export const getUser = async (
  supabaseClient: SupabaseDbClient
): Promise<User | null> => {
  const { data } = await supabaseClient.auth.getUser()

  return data.user
}

export const getUserPreferences = async (supabaseClient: SupabaseDbClient) => {
  const user = await getUser(supabaseClient)

  if (!user) return null

  const { data } = await supabaseClient
    .from("preferences")
    .select("values")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle()

  return data?.values ?? null
}

export const updateUserPreferences = async (
  supabaseClient: SupabaseDbClient,
  preferences: UserPreferences
) => {
  const user = await getUser(supabaseClient)

  if (!user) return null

  await supabaseClient
    .from("preferences")
    .update({ values: preferences })
    .eq("user_id", user.id)
}
