import { kanjiItemJlptLevelSchema } from "#/types"
import { z } from "zod"

export enum KnowledgeTestSteps {
  PROMPT = "prompt",
  TEST = "test",
  SCORE = "score"
}

export type KnowledgeEvaluationTestItem = z.infer<
  typeof knowldegeEvaluationTestItemSchema
>

export const knowldegeEvaluationTestItemSchema = z.object({
  kanji: z.string(),
  reading: z.string(),
  level: kanjiItemJlptLevelSchema
})
