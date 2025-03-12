'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Label } from '#/components/ui/label'
import { DateTime } from 'luxon'
import { useFlashcardsSessionSummary } from '#/hooks/flashcards'

export enum SessionItemEvaluation {
  FAIL = 'fail',
  HARD = 'hard',
  GOOD = 'good',
  EASY = 'easy',
}

export type KanjiSessionSet = {
  kanji: string
  evaluation: SessionItemEvaluation | null
}

type FlashcardsSessionSummaryProps = {
  kanjiSet: KanjiSessionSet[]
  sessionStartTime: DateTime | null
  onNewSessionClick: () => void
  onEndSessionClick: () => void
}

export default function FlashcardsSessionSummary({
  kanjiSet,
  sessionStartTime,
  onNewSessionClick,
  onEndSessionClick,
}: FlashcardsSessionSummaryProps) {
  const { timeSpent } = useFlashcardsSessionSummary(sessionStartTime)

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-y-2 gap-x-8 mb-10'>
          {kanjiSet.map(({ kanji, evaluation }) => (
            <div
              key={kanji}
              className='w-full flex justify-between items-center gap-2'
            >
              <div className='text-3xl font-bold'>{kanji}</div>
              <div>{evaluation}</div>
              {/* TODO: Calculate new grade */}
              <div>70%</div>
            </div>
          ))}
        </div>
        <div className='flex gap-4'>
          <div className='flex flex-col items-center flex-1'>
            <Label>Time spent</Label>
            <div className='text-3xl font-bold'>{timeSpent}</div>
          </div>
          <div className='flex flex-col items-center flex-1'>
            <Label>Points earned</Label>
            {/* TODO: Add function calculating points */}
            <div className='text-3xl font-bold'>+10</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-center gap-4'>
        <Button
          className='cursor-pointer w-[200px]'
          onClick={onNewSessionClick}
        >
          New session
        </Button>
        <Button
          className='cursor-pointer w-[200px]'
          onClick={onEndSessionClick}
          variant='secondary'
        >
          Go to dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}
