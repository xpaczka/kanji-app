import { z } from "zod"
import { kanjiItemJlptLevelSchema } from "./kanji"

export type UserKanjiHistory = z.infer<typeof userKanjiHistorySchema>
export type UserPreferences = z.infer<typeof userPreferencesSchema>

export const userPreferencesSchema = z
  .object({ showRomaji: z.boolean() })
  .nullable()

export const userKanjiHistorySchema = z.object({
  level: kanjiItemJlptLevelSchema.nullable(),
  kanji: z.string().nullable(),
  timestamp: z.date()
})
