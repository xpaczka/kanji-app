import { z } from "zod"

export type MemoGameItem = z.infer<typeof memoGameItemSchema>

export const memoGameItemSchema = z.object({
  kanji: z.string(),
  meaning: z.string()
})
