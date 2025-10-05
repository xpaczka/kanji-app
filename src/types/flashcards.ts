import { z } from "zod"

// Enums
export enum FlashcardsItemEvaluation {
  FAIL = "fail",
  HARD = "hard",
  GOOD = "good",
  EASY = "easy"
}

// Schemas
export const FlashcardsItemSchema = z.object({
  id: z.string().optional(),
  kanji: z.string().optional(),
  evaluation: z.nativeEnum(FlashcardsItemEvaluation)
})

// Types
export type FlashcardsItem = z.infer<typeof FlashcardsItemSchema>
