'use client'
import { checkMemoGamePairs, MemoGameChoice } from '#/lib/memo-game'
import { MemoGameItem } from '#/schemas/games'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

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
      if (firstChoice?.value === value || (firstChoice && secondChoice)) return

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
    [firstChoice, secondChoice]
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
      } else if (cardsRevealed.every((card) => card)) {
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
