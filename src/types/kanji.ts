import { z } from "zod"

export type KanjiItemJlptLevel = z.infer<typeof kanjiItemJlptLevelSchema>

export const kanjiItemJlptLevelSchema = z.enum([
  "jlpt-n1",
  "jlpt-n2",
  "jlpt-n3",
  "jlpt-n4",
  "jlpt-n5"
])
