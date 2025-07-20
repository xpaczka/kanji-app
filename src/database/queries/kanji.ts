import { KanjiItemJlptLevel, SupabaseDbClient } from "#/types"

export const getAllKanjiQuery = async (supabaseClient: SupabaseDbClient) => {
  const { data } = await supabaseClient.from("kanji").select("*")

  return data
}

export const getKanjiByLevelQuery = async (
  supabaseclient: SupabaseDbClient,
  level: KanjiItemJlptLevel
) => {
  const { data } = await supabaseclient
    .from("kanji")
    .select("*")
    .eq("level", level)

  return data
}
