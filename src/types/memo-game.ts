import { z } from "zod"

// Schemas
export const MemoGameChoiceSchema = z
  .object({ value: z.string(), index: z.number() })
  .nullable()

export const MemoGameItemSchema = z.object({
  kanji: z.string(),
  meaning: z.string()
})

// Types
export type MemoGameChoice = z.infer<typeof MemoGameChoiceSchema>
export type MemoGameItem = z.infer<typeof MemoGameItemSchema>
