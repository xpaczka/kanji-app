"use client"
import { checkMemoGamePairs, MemoGameChoice } from "#/lib/memo-game"
import { useAppSessionStore } from "#/store/app-session"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigation } from "./router"
import { ROUTES } from "#/constants/router"
import { v4 as uuid } from "uuid"
import { trpc } from "#/app/_trpc/client"
import { shuffle } from "#/lib/utils"
import { DateTime } from "luxon"
import { useInterval } from "usehooks-ts"
import { MEMO_GAME_GUESS_COOLDOWN } from "#/constants/memo-game"

export const useInitiateMemoGameSession = () => {
  const setSession = useAppSessionStore((state) => state.setSession)
  const { navigate } = useNavigation()

  const initiateMemoGameSessionHandler = useCallback(() => {
    const sessionId = uuid()

    setSession({
      sessionId,
      sessionType: "flashcards",
      sessionParentUrl: ROUTES.gamesDashboard
    })

    navigate(`${ROUTES.memoGame}/${sessionId}`)
  }, [navigate, setSession])

  return { initiateMemoGameSession: initiateMemoGameSessionHandler }
}

export const useMemoGameCards = () => {
  const {
    data: kanjiSet,
    isLoading,
    refetch
  } = trpc.memoGame.getMemoGameKanji.useQuery()

  const cards = useMemo(
    () =>
      kanjiSet && kanjiSet.length > 0
        ? shuffle(kanjiSet.flatMap((item) => Object.values(item)))
        : [],
    [kanjiSet]
  )

  const [initialTime, setInitialTime] = useState<DateTime | null>(null)
  const [time, setTime] = useState<DateTime | null>(null)

  useEffect(() => {
    const now = DateTime.now()

    setInitialTime(now)
    setTime(now)
  }, [])

  useInterval(() => {
    if (!initialTime) return

    const newTime = initialTime.plus({
      milliseconds: DateTime.now().diff(initialTime).milliseconds
    })
    setTime(newTime)
  }, 500)

  const [guessCount, setGuessCount] = useState(0)

  const [cardsRevealed, setCardsRevealed] = useState(cards.map(() => false))
  const [gameWon, setGameWon] = useState(false)

  const [firstChoice, setFirstChoice] = useState<MemoGameChoice>(null)
  const [secondChoice, setSecondChoice] = useState<MemoGameChoice>(null)

  const { navigate } = useNavigation()
  const { resetSession } = useAppSessionStore((state) => state)
  const { initiateMemoGameSession } = useInitiateMemoGameSession()

  const memoGamePairs = useMemo(() => {
    if (!kanjiSet || !kanjiSet.length) return {}

    return Object.fromEntries(
      kanjiSet.map((item) => {
        const values = Object.values(item)
        return [values[0], values[1]]
      })
    )
  }, [kanjiSet])

  const toggleCard = useCallback(
    (value: string, index: number) => {
      if (
        firstChoice?.value === value ||
        (firstChoice && secondChoice) ||
        cardsRevealed[index]
      )
        return

      if (!firstChoice) {
        setFirstChoice({ value, index })
      } else if (!secondChoice) {
        setSecondChoice({ value, index })
      }

      setCardsRevealed((prev) => {
        const prevState = [...prev]
        prevState[index] = prevState[index] ? false : true

        return prevState
      })
    },
    [firstChoice, secondChoice, cardsRevealed]
  )

  const resetSessionState = useCallback(() => {
    setCardsRevealed(cards.map(() => false))
    setGameWon(false)
    setFirstChoice(null)
    setSecondChoice(null)
    setGuessCount(0)
    setInitialTime(DateTime.now())
    setTime(DateTime.now())
  }, [cards])

  const newSessionHandler = useCallback(() => {
    resetSessionState()
    initiateMemoGameSession()
    refetch()
  }, [resetSessionState, refetch, initiateMemoGameSession])

  const endSessionHandler = useCallback(() => {
    navigate(ROUTES.gamesDashboard)

    resetSessionState()
    resetSession()
  }, [navigate, resetSessionState, resetSession])

  useEffect(() => {
    if (!firstChoice || !secondChoice) return

    const timeout = setTimeout(() => {
      if (!checkMemoGamePairs(memoGamePairs, firstChoice, secondChoice)) {
        setCardsRevealed((prev) => {
          const prevState = [...prev]

          prevState[firstChoice.index] = false
          prevState[secondChoice.index] = false

          return prevState
        })
      } else if (cardsRevealed.every((card) => card === true)) {
        setGameWon(true)
      }

      setGuessCount((prev) => prev + 1)
      setFirstChoice(null)
      setSecondChoice(null)
    }, MEMO_GAME_GUESS_COOLDOWN * 1_000)

    return () => clearTimeout(timeout)
  }, [firstChoice, secondChoice, memoGamePairs, cardsRevealed, setGuessCount])

  return {
    cards,
    isLoading,
    cardsRevealed,
    toggleCard,
    gameWon,
    gameStartTime: initialTime,
    currentTime: time,
    guessCount,
    newSession: newSessionHandler,
    endSession: endSessionHandler
  }
}
