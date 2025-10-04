import { kanjiItemJlptLevelSchema } from "#/types"
import { z } from "zod"

export type KanjiProficiency = z.infer<typeof kanjiProficiencySchema>
export type KanjiSessionSetItem = z.infer<typeof kanjiSessionItemSchema>

export enum FlashcardGameItemEvaluation {
  FAIL = "fail",
  HARD = "hard",
  GOOD = "good",
  EASY = "easy"
}

export const kanjiSessionItemSchema = z.object({
  id: z.string().optional(),
  kanji: z.string().optional(),
  evaluation: z.nativeEnum(FlashcardGameItemEvaluation)
})

export const kanjiProficiencySchema = z.object({
  kanji: z.string().nullable(),
  level: kanjiItemJlptLevelSchema.nullable(),
  proficiency: z.number().gte(0)
})
