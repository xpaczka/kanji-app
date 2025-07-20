import { KanjiSessionSetItem } from "#/schemas/kanji"
import { getUser } from "./user"
import { SupabaseDbClient } from "#/types"

export const updateUserKanjiHistory = async (
  supabaseClient: SupabaseDbClient,
  kanji: KanjiSessionSetItem
) => {
  const user = await getUser(supabaseClient)

  if (!user || !kanji.id) return

  await supabaseClient.rpc("update_user_kanji_history", {
    user_id: user.id,
    kanji_id: kanji.id,
    updated_at: new Date().toString()
  })
}

export const getUserKanjiHistory = async (supabaseClient: SupabaseDbClient) => {
  const user = await getUser(supabaseClient)

  if (!user) return []

  const { data } = await supabaseClient.rpc("get_user_kanji_history", {
    user_id: user.id
  })

  return data
}
