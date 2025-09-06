"use client"

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from "react"
import { toHiragana } from "wanakana"
import similarity from "similarity"
import { trpc } from "#/app/_trpc/client"
import { calculateNextReviewTime } from "#/utils"
import { KanjiItemProps, KanjiValidationState } from "#/types"
import { KanjiItem } from "../Kanji"

type LearnItemProps = Omit<
  KanjiItemProps,
  | "validationState"
  | "onSubmit"
  | "onInputChange"
  | "nextItemHandler"
  | "inputValue"
> & {
  kanjiId: string
  kanjiMap: Map<string, boolean>
  setKanjiMap: Dispatch<SetStateAction<Map<string, boolean>>>
  getNextItem: (value: boolean) => void
}

export default function LearnItem({
  kanjiId,
  kanji,
  readings,
  meanings,
  kanjiMap,
  setKanjiMap,
  getNextItem
}: LearnItemProps) {
  const [value, setValue] = useState("")

  const [validationState, setValidationState] =
    useState<KanjiValidationState>(null)

  const { mutateAsync: updateUserKanji } =
    trpc.kanji.updateUserKanji.useMutation()

  const isInputValid = useCallback((): boolean => {
    if (!!meanings) {
      return meanings.some(
        (meaning) =>
          similarity(meaning, value.trim(), { sensitive: false }) > 0.9
      )
    }

    if (!!readings) {
      return readings.some(
        (reading) =>
          similarity(reading, value.trim(), { sensitive: false }) > 0.9
      )
    }

    return false
  }, [meanings, readings, value])

  const onInputSubmit = useCallback(
    async (key: KeyboardEvent["key"]) => {
      if (key !== "Enter") return

      const isValid = isInputValid()
      setValidationState(isValid ? "valid" : "invalid")

      if (!isValid) return

      const kanjiInMap = kanjiMap.has(kanji)

      if (kanjiInMap) {
        await updateUserKanji({
          kanjiId,
          stage: 1,
          nextReviewAt: calculateNextReviewTime(1)
        })
      } else {
        setKanjiMap(kanjiMap.set(kanji, true))
      }

      setTimeout(() => {
        setValidationState(null)
        getNextItem(true)
        setValue("")
      }, 1000)
    },
    [
      getNextItem,
      isInputValid,
      kanji,
      kanjiId,
      kanjiMap,
      setKanjiMap,
      updateUserKanji
    ]
  )

  const nextItemHandler = useCallback(() => {
    setValidationState(null)
    getNextItem(false)
    setValue("")
  }, [getNextItem])

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      if (!!readings) {
        setValue(toHiragana(value, { IMEMode: true }))
      } else {
        setValue(value)
      }
    },
    [readings]
  )

  return (
    <KanjiItem
      inputValue={value}
      kanji={kanji}
      validationState={validationState}
      meanings={meanings}
      readings={readings}
      onInputChange={onInputChange}
      onSubmit={onInputSubmit}
      nextItemHandler={nextItemHandler}
    />
  )
}
