import { kanjiItemJlptLevel } from '#/database/schema'
import { z } from 'zod'

export type KanjiProficiency = z.infer<typeof kanjiProficiencySchema>

export const kanjiProficiencySchema = z.object({
  kanji: z.string(),
  level: kanjiItemJlptLevel,
  proficiency: z.number().gte(0),
})
