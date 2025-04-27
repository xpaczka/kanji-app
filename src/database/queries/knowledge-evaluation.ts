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

  return knowledgeLevel.length ? knowledgeLevel[0].level : null
}
