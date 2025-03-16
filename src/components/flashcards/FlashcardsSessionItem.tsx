'use client'

import { toRomaji } from 'wanakana'
import { Card, CardContent, CardFooter } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { SessionItemEvaluation } from './FlashcardsSessionSummary'
import FlashcardsSessionReading from './FlashcardsSessionReading'
import { useMemo } from 'react'
import { DatabaseKanji } from '#/database/schema'

type FlashcardSessionItemProps = {
  kanji: DatabaseKanji
  isRevealed: boolean
  showRomaji: boolean
  onRevealClick: () => void
  onEvaluateClick: (evalution: SessionItemEvaluation) => void
}

export default function FlashcardSessionItem({
  kanji,
  isRevealed,
  showRomaji,
  onRevealClick,
  onEvaluateClick,
}: FlashcardSessionItemProps) {
  const onReadings = useMemo(
    () =>
      showRomaji
        ? toRomaji(kanji.on_readings.join(', '))
        : kanji.on_readings.join(', '),
    [kanji.on_readings, showRomaji]
  )

  const kunReadings = useMemo(
    () =>
      showRomaji
        ? toRomaji(kanji.kun_readings.join(', '))
        : kanji.kun_readings.join(', '),
    [kanji.kun_readings, showRomaji]
  )

  if (isRevealed) {
    return (
      <Card className='w-full aspect-square items-center p-12'>
        <CardContent className='flex flex-col justify-center items-center flex-1 text-center'>
          <div className='flex flex-col items-center gap-3 mb-6'>
            <div className='flex flex-col items-center'>
              {kanji.on_readings.length > 0 && (
                <FlashcardsSessionReading tooltipContent='On-reading is usually used when the kanji is a part of a compound (two or more kanji characters are placed side by site)'>
                  On {kanji.on_readings.length > 1 ? 'readings' : 'reading'}
                </FlashcardsSessionReading>
              )}
              <p className='font-bold text-2xl'>{onReadings}</p>
            </div>
            <div className='flex flex-col items-center'>
              {kanji.kun_readings.length > 0 && (
                <FlashcardsSessionReading tooltipContent='Kun-reading is used when the kanji is used on its own, either as a complete noun or as adjective stems and verb stems'>
                  Kun {kanji.kun_readings.length > 1 ? 'readings' : 'reading'}
                </FlashcardsSessionReading>
              )}
              <p className='font-bold text-2xl'>{kunReadings}</p>
            </div>
          </div>
          <p className='italic'>{kanji.meanings.join(', ')}</p>
        </CardContent>
        <CardFooter className='flex items-center gap-2'>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.FAIL)}
          >
            Fail
          </Button>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.HARD)}
          >
            Hard
          </Button>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.GOOD)}
          >
            Good
          </Button>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.EASY)}
          >
            Easy
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className='w-full aspect-square items-center p-12'>
      <CardContent className='flex justify-center items-center flex-1 text-9xl'>
        {kanji.kanji}
      </CardContent>
      <CardFooter>
        <Button className='cursor-pointer' size='lg' onClick={onRevealClick}>
          Flip
        </Button>
      </CardFooter>
    </Card>
  )
}
