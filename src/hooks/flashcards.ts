import { DateTime } from "luxon"
import { trpc } from "#/app/_trpc/client"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigation } from "./router"
import { ROUTES } from "#/constants/router"
import { calculateTimeDifferenceToFormat } from "#/lib/utils"
import {
  KanjiSessionSetItem,
  FlashcardGameItemEvaluation
} from "#/schemas/kanji"
import { KanjiItemJlptLevel } from "#/types"

export const useFlashcardsGame = () => {
  const params = useSearchParams()
  const level = params.get("level") as KanjiItemJlptLevel | undefined

  const {
    data: kanjiSet,
    isLoading: isLoadingKanjiSet,
    refetch: refetchKanjiSet
  } = trpc.flashcards.getFlashcardsSessionKanji.useQuery(level ?? undefined)

  const [kanjiIndex, setKanjiIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [sessionSet, setSessionSet] = useState<KanjiSessionSetItem[]>([])
  const [sessionStartTime, setSessionStartTime] = useState<DateTime | null>(
    null
  )

  useEffect(() => {
    setSessionStartTime(DateTime.now())
  }, [])

  const { navigate } = useNavigation()

  const evaluateKanjiHandler = useCallback(
    (evaluation: FlashcardGameItemEvaluation) => {
      if (!kanjiSet) return

      const evalutedKanjiItem = {
        id: kanjiSet[kanjiIndex].id,
        kanji: kanjiSet[kanjiIndex].kanji,
        evaluation
      }

      setSessionSet((prev) => [...prev, evalutedKanjiItem])

      setKanjiIndex((prev) => prev + 1)
      setIsRevealed(false)

      if (kanjiIndex === kanjiSet.length - 1) {
        setSessionCompleted(true)
      }
    },
    [kanjiIndex, kanjiSet]
  )

  const resetSessionState = useCallback(() => {
    setKanjiIndex(0)
    setIsRevealed(false)
    setSessionCompleted(false)
    setSessionSet([])
    setSessionStartTime(DateTime.now())
  }, [])

  const newSessionHandler = useCallback(() => {
    resetSessionState()
    refetchKanjiSet()
  }, [resetSessionState, refetchKanjiSet])

  const endSessionHandler = useCallback(() => {
    navigate(ROUTES.index)
    resetSessionState()
  }, [navigate, resetSessionState])

  return {
    kanjiSet,
    isLoading: isLoadingKanjiSet,
    kanjiIndex,
    isRevealed,
    setIsRevealed,
    sessionStartTime,
    sessionCompleted,
    sessionSet,
    evaluateKanji: evaluateKanjiHandler,
    newSession: newSessionHandler,
    endSession: endSessionHandler
  }
}

export const useFlashcardsGameSummary = (sessionStartTime: DateTime | null) => {
  const [sessionEndTime, setSessionEndTime] = useState<DateTime | null>(null)

  useEffect(() => {
    setSessionEndTime(DateTime.now())
  }, [])

  const timeSpent = useMemo(
    () =>
      sessionStartTime && sessionEndTime
        ? calculateTimeDifferenceToFormat(sessionStartTime, sessionEndTime)
        : "0:00",

    [sessionStartTime, sessionEndTime]
  )

  return { timeSpent }
}
