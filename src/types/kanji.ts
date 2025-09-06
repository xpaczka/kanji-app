import { z } from "zod"
import { Database } from "./supabase"
import { ChangeEvent } from "react"

export type DatabaseKanji = Database["public"]["Tables"]["kanji"]["Row"]
export type KanjiItemJlptLevel = z.infer<typeof kanjiItemJlptLevelSchema>

export type KanjiValidationState = "valid" | "invalid" | null

export type KanjiItemProps = {
  kanji: string
  meanings?: string[]
  readings?: string[]
  inputValue: string
  validationState: KanjiValidationState
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (key: KeyboardEvent["key"]) => void
  nextItemHandler: () => void
}

export const kanjiItemJlptLevelSchema = z.enum([
  "jlpt-n1",
  "jlpt-n2",
  "jlpt-n3",
  "jlpt-n4",
  "jlpt-n5"
])
