'use client'

import { trpc } from '#/app/_trpc/client'
import MemoGameItem from '#/components/memo-game/MemoGameItem'
import { Spinner } from '#/components/ui/spinner'
import { shuffle } from '#/lib/utils'
import { DateTime } from 'luxon'
import { useCallback, useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'

export default function MemoGameSessionPage() {
  const { data: kanjiSet, isLoading } =
    trpc.memoGame.getMemoGameKanji.useQuery()

  const [time, setTime] = useState(1000)
  const [guessCount] = useState(0)

  const memoGamePairs = useMemo(() => {
    if (!kanjiSet || !kanjiSet.length) return []

    return kanjiSet.map((item) => {
      const values = Object.values(item)
      return { [values[0]]: values[1] }
    })
  }, [kanjiSet])

  useInterval(() => {
    setTime((prev) => prev + 1000)
  }, 1000)

  const cards = useMemo(
    () =>
      kanjiSet && kanjiSet.length > 0
        ? shuffle(kanjiSet.flatMap((item) => Object.values(item)))
        : [],
    [kanjiSet]
  )

  const [cardsRevealed, setCardsRevealed] = useState(cards.map(() => false))
  const [firstChoice, setFirstChoice] = useState<string | null>(null)
  const [secondChoice, setSecondChoice] = useState<string | null>(null)

  const toggleCard = useCallback(
    (value: string, index: number) => {
      console.log(firstChoice, secondChoice)

      if (
        firstChoice === value ||
        (firstChoice !== null && secondChoice !== null)
      )
        return

      if (firstChoice === null) {
        setFirstChoice(value)
      } else if (secondChoice === null) {
        setSecondChoice(value)
      }

      setCardsRevealed((prev) => {
        const prevState = [...prev]
        prevState[index] = prevState[index] ? false : true

        return prevState
      })
    },
    [firstChoice, secondChoice]
  )

  if (isLoading) {
    return (
      <Spinner size='large'>
        <span className='text-sm'>Loading your game...</span>
      </Spinner>
    )
  }

  if (!kanjiSet) return null

  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-10 mb-4'>
        <div>
          Time: <strong>{DateTime.fromMillis(time).toFormat('mm:ss')}</strong>
        </div>
        <div>
          Guesses: <strong>{guessCount}</strong>
        </div>
      </div>
      <div className='grid grid-cols-4 grid-rows-4 gap-4'>
        {kanjiSet &&
          cards.map((card, index) => (
            <MemoGameItem
              key={`${card}-${index}`}
              content={card}
              isRevealed={cardsRevealed[index]}
              onClick={() => toggleCard(card, index)}
            />
          ))}
      </div>
    </div>
  )
}
