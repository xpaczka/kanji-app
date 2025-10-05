import { z } from "zod"
import { ChangeEvent } from "react"

// Schemas
export const KanjiValidationStateSchema = z
  .enum(["valid", "invalid"])
  .nullable()

// Types
export type KanjiValidationState = z.infer<typeof KanjiValidationStateSchema>

export type KanjiItemInputObject = {
  kanji: string
  meanings?: string[]
  readings?: string[]
  inputValue: string
  validationState: KanjiValidationState
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (key: KeyboardEvent["key"]) => void
  nextItemHandler: () => void
}
