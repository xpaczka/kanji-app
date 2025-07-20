import { toHiragana } from "wanakana"
import { KnowledgeEvaluationTestItem } from "#/schemas"
import { getUser } from "./user"
import { KanjiItemJlptLevel, SupabaseDbClient } from "#/types"

export const getUserKnowledgeEvaluationLevel = async (
  supabaseClient: SupabaseDbClient
): Promise<KanjiItemJlptLevel | null> => {
  const user = await getUser(supabaseClient)

  if (!user) return null

  const { data: knowledgeLevel } = await supabaseClient
    .from("knowledge_evaluation")
    .select("level")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle()

  return knowledgeLevel
    ? (knowledgeLevel.level as KanjiItemJlptLevel | null)
    : null
}

export const getKnowledgeEvaluationTestItems = async (
  supabaseClient: SupabaseDbClient
): Promise<KnowledgeEvaluationTestItem[]> => {
  const levels: KanjiItemJlptLevel[] = [
    "jlpt-n5",
    "jlpt-n4",
    "jlpt-n3",
    "jlpt-n2",
    "jlpt-n1"
  ]

  const testItems: KnowledgeEvaluationTestItem[] = []

  for (const level of levels) {
    const { data: items } = await supabaseClient
      .from("kanji")
      .select("kanji, kun_readings, on_readings")
      .eq("level", level)
      .order("random()")
      .limit(10)

    if (!items || !items.length) {
      throw new Error("Failed to fetch kanji items for evaluation test")
    }

    const kanjiSet = items.map(({ kanji, kun_readings, on_readings }) => ({
      kanji,
      reading: toHiragana(
        (kun_readings[0] ?? on_readings[0]).replaceAll(".", "").trim()
      ),
      level
    }))

    testItems.push(...kanjiSet)
  }

  return testItems
}

export const createUserKnowledgeEvaluation = async (
  supabaseClient: SupabaseDbClient,
  level: KanjiItemJlptLevel
): Promise<void> => {
  const user = await getUser(supabaseClient)

  if (!user) return

  await supabaseClient
    .from("knowledge_evaluation")
    .insert({ user_id: user.id, level })
}
