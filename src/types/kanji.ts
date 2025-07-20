import { z } from "zod"
import { Database } from "./supabase"

export type DatabaseKanji = Database["public"]["Tables"]["kanji"]["Row"]
export type KanjiItemJlptLevel = z.infer<typeof kanjiItemJlptLevelSchema>

export const kanjiItemJlptLevelSchema = z.enum([
  "jlpt-n1",
  "jlpt-n2",
  "jlpt-n3",
  "jlpt-n4",
  "jlpt-n5"
])
