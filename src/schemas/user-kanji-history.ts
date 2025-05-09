import { kanjiItemJlptLevelSchema } from "#/database/schema"
import { z } from "zod"

export type UserKanjiHistory = z.infer<typeof userKanjiHistorySchema>

export const userKanjiHistorySchema = z.object({
  level: kanjiItemJlptLevelSchema.nullable(),
  kanji: z.string().nullable(),
  timestamp: z.date()
})
