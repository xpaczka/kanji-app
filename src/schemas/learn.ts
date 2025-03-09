import { z } from 'zod'

export const kanjiLevelSchema = z.enum(['N5', 'N4', 'N3', 'N2', 'N2'])

export const kanjiItemSchema = z.object({
  kanji: z.string(),
  level: kanjiLevelSchema,
  proficiency: z.number().gte(0),
})

export type KanjiLevel = z.infer<typeof kanjiLevelSchema>
export type KanjiItem = z.infer<typeof kanjiItemSchema>
