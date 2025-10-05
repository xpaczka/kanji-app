import { DateTime } from "luxon"
import { trpc } from "#/app/_trpc/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigation } from "./router"
import { ROUTES } from "#/constants/router"
import { calculateTimeDifferenceToFormat, shuffle } from "#/utils"
import { FlashcardsItem, FlashcardsItemEvaluation } from "#/types"

export const useFlashcardsGame = () => {
  const {
    data,
    isLoading: isLoadingKanjiSet,
    refetch: refetchKanjiSet
  } = trpc.flashcards.getFlashcardsGameKanji.useQuery()

  const [kanjiIndex, setKanjiIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [sessionSet, setSessionSet] = useState<FlashcardsItem[]>([])
  const [sessionStartTime, setSessionStartTime] = useState<DateTime | null>(
    null
  )

  const kanjiSet = useMemo(() => shuffle(data?.items ?? []), [data])

  useEffect(() => {
    setSessionStartTime(DateTime.now())
  }, [])

  const { navigate } = useNavigation()

  const evaluateKanjiHandler = useCallback(
    (evaluation: FlashcardsItemEvaluation) => {
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
