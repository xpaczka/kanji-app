import { z } from 'zod'

export const kanjiItemJlptLevel = z.enum([
  'jlpt-n1',
  'jlpt-n2',
  'jlpt-n3',
  'jlpt-n4',
  'jlpt-n5',
])

export const kanjiItemSchema = z.object({
  kanji: z.string().length(1),
  level: kanjiItemJlptLevel,
  meanings: z.array(z.string()).min(1),
  kun_readings: z.array(z.string()),
  on_readings: z.array(z.string()),
})

export type KanjiItemJlptLevel = z.infer<typeof kanjiItemJlptLevel>
export type KanjiItem = z.infer<typeof kanjiItemSchema>
