import { eq, sql } from "drizzle-orm"
import { database } from ".."
import {
  KanjiItemJlptLevel,
  kanjiTable,
  knowledgeEvaluationTable
} from "../schema"
import { toHiragana } from "wanakana"
import { KnowledgeEvaluationTestItem } from "#/schemas"

export const getUserKnowledgeEvaluationLevel = async (
  userId: string
): Promise<KanjiItemJlptLevel | null> => {
  const knowledgeLevel = await database
    .select({ level: knowledgeEvaluationTable.level })
    .from(knowledgeEvaluationTable)
    .where(eq(knowledgeEvaluationTable.user_id, userId))
    .limit(1)

  return knowledgeLevel.length ? knowledgeLevel[0].level : null
}

export const getKnowledgeEvaluationTestItems = async (): Promise<
  KnowledgeEvaluationTestItem[]
> => {
  const levels: KanjiItemJlptLevel[] = [
    "jlpt-n5",
    "jlpt-n4",
    "jlpt-n3",
    "jlpt-n2",
    "jlpt-n1"
  ]

  const testItems: KnowledgeEvaluationTestItem[] = []

  for (const level of levels) {
    const items = await database
      .select()
      .from(kanjiTable)
      .where(eq(kanjiTable.level, level))
      .orderBy(sql`RANDOM()`)
      .limit(10)

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
  userId: string,
  level: KanjiItemJlptLevel
): Promise<void> => {
  await database
    .insert(knowledgeEvaluationTable)
    .values({ user_id: userId, level })
}
