"use client"

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from "react"
import { KanjiItemInputObject, KanjiValidationState } from "#/types"
import similarity from "similarity"
import { trpc } from "#/app/_trpc/client"
import { toHiragana } from "wanakana"
import { calculateNextReviewTime } from "#/utils"
import { KanjiItem } from "../Kanji"

type ReviewItemProps = Omit<
  KanjiItemInputObject,
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
  stage: number
  userKanjiUuid: string
}

export default function ReviewItem({
  kanjiId,
  kanji,
  meanings,
  readings,
  getNextItem,
  kanjiMap,
  setKanjiMap,
  stage,
  userKanjiUuid
}: ReviewItemProps) {
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

      if (!isValid) {
        setKanjiMap(kanjiMap.set(kanji, false))
        return
      }

      const kanjiInMap = kanjiMap.has(kanji)

      if (kanjiInMap) {
        const isKanjiValidationCorrect = kanjiMap.get(kanji)

        const newStage = isKanjiValidationCorrect
          ? stage + 1
          : Math.max(1, stage - 2)

        await updateUserKanji({
          userKanjiUuid,
          kanjiId,
          stage: newStage,
          nextReviewAt: calculateNextReviewTime(newStage)
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
      updateUserKanji,
      stage,
      userKanjiUuid
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
