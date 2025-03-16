import { kanjiItemJlptLevel } from '#/database/schema'
import { z } from 'zod'

export const kanjiProficiencySchema = z.object({
  kanji: z.string(),
  level: kanjiItemJlptLevel,
  proficiency: z.number().gte(0),
})

export type KanjiProficiency = z.infer<typeof kanjiProficiencySchema>
