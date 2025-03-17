'use client'

import { trpc } from '#/app/_trpc/client'
import { Button } from '#/components/ui/button'
import { shuffle } from '#/lib/utils'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'

export default function MemoGameSessionPage() {
  const [time, setTime] = useState(1000)
  const [guessCount, setGuessCount] = useState(0)

  const { data: kanjiSet } = trpc.memoGame.getMemoGameKanji.useQuery()

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
          cards.map((card) => (
            <Button
              asChild
              key={card}
              variant='outline'
              onClick={() => setGuessCount((prev) => prev + 1)}
            >
              <div className='flex justify-center items-center aspect-square h-24 w-24 border rounded-sm'>
                {card}
              </div>
            </Button>
          ))}
      </div>
    </div>
  )
}
