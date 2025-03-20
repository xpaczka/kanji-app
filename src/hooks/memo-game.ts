'use client'
import { checkMemoGamePairs, MemoGameChoice } from '#/lib/memo-game'
import { MemoGameItem } from '#/schemas/games'
import { useAppSessionStore } from '#/store/app-session'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigation } from './router'
import { ROUTES } from '#/constants/router'
import { v4 as uuid } from 'uuid'

export const useInitiateMemoGameSession = () => {
  const { setSession } = useAppSessionStore((state) => state)
  const { navigate } = useNavigation()

  const initiateMemoGameSessionHandler = useCallback(() => {
    const sessionId = uuid()

    setSession({
      sessionId,
      sessionType: 'flashcards',
      sessionParentUrl: ROUTES.gamesDashboard,
    })

    navigate(`${ROUTES.memoGame}/${sessionId}`)
  }, [navigate, setSession])

  return { initiateMemoGameSession: initiateMemoGameSessionHandler }
}

export const useMemoGameCards = (
  kanjiSet: MemoGameItem[] | undefined,
  cards: string[],
  setGuessCount: Dispatch<SetStateAction<number>>
) => {
  const [cardsRevealed, setCardsRevealed] = useState(cards.map(() => false))
  const [gameWon, setGameWon] = useState(false)

  const [firstChoice, setFirstChoice] = useState<MemoGameChoice>(null)
  const [secondChoice, setSecondChoice] = useState<MemoGameChoice>(null)

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
    }, 1_000)

    return () => clearTimeout(timeout)
  }, [firstChoice, secondChoice, memoGamePairs, cardsRevealed, setGuessCount])

  return { cardsRevealed, toggleCard, gameWon }
}
