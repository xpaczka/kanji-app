'use client'

import { trpc } from '#/app/_trpc/client'
import MemoGameItem from '#/components/memo-game/MemoGameItem'
import MemoGameSummary from '#/components/memo-game/MemoGameSummary'
import { Spinner } from '#/components/ui/spinner'
import { useMemoGameCards } from '#/hooks/memo-game'
import { calculateTimeDifferenceToFormat, shuffle } from '#/lib/utils'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'

export default function MemoGameSessionPage() {
  const { data: kanjiSet, isLoading } =
    trpc.memoGame.getMemoGameKanji.useQuery()

  const initialTime = useMemo(() => DateTime.now(), [])

  const [time, setTime] = useState<DateTime>(initialTime)
  const [guessCount, setGuessCount] = useState(0)

  useInterval(() => {
    const newTime = initialTime.plus({
      milliseconds: DateTime.now().diff(initialTime).milliseconds,
    })
    setTime(newTime)
  }, 500)

  const cards = useMemo(
    () =>
      kanjiSet && kanjiSet.length > 0
        ? shuffle(kanjiSet.flatMap((item) => Object.values(item)))
        : [],
    [kanjiSet]
  )

  const { cardsRevealed, toggleCard, gameWon } = useMemoGameCards(
    kanjiSet,
    cards,
    setGuessCount
  )

  if (gameWon) {
    return <MemoGameSummary gameStartTimestamp={initialTime} />
  }

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
          Time:{' '}
          <strong>{calculateTimeDifferenceToFormat(initialTime, time)}</strong>
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
