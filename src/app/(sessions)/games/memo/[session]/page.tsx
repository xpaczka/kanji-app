'use client'

import { Button } from '#/components/ui/button'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

const TILES_COUNT = 16

export default function MemoGameSessionPage() {
  const [time, setTime] = useState(1000)
  const [guessCount, setGuessCount] = useState(0)

  useInterval(() => {
    setTime((prev) => prev + 1000)
  }, 1000)

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
        {Array.from({ length: TILES_COUNT }).map((_, index) => (
          <Button
            asChild
            key={index}
            variant='outline'
            onClick={() => setGuessCount((prev) => prev + 1)}
          >
            <div className='flex justify-center items-center aspect-square h-24 w-24 border rounded-sm'>
              {index}
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
