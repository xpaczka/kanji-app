import { eq } from "drizzle-orm"
import { database } from ".."
import { KanjiItemJlptLevel, knowledgeEvaluationTable } from "../schema"

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

export const createUserKnowledgeEvaluation = async (
  userId: string,
  level: KanjiItemJlptLevel
): Promise<void> => {
  await database
    .insert(knowledgeEvaluationTable)
    .values({ user_id: userId, level })
}
