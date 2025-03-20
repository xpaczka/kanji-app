import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Label } from '#/components/ui/label'
import { useEffect, useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import { calculateTimeDifferenceToFormat } from '#/lib/utils'

type MemoGameSummaryProps = {
  gameStartTimestamp: DateTime | null
  endSessionHandler: () => void
  newSessionHandler: () => void
}

export default function MemoGameSummary({
  gameStartTimestamp,
  endSessionHandler,
  newSessionHandler,
}: MemoGameSummaryProps) {
  const [sessionEndTime, setSessionEndTime] = useState<DateTime | null>(null)

  useEffect(() => {
    setSessionEndTime(DateTime.now())
  }, [])

  const gameTime = useMemo(
    () =>
      sessionEndTime
        ? calculateTimeDifferenceToFormat(gameStartTimestamp, sessionEndTime)
        : '0:00',
    [gameStartTimestamp, sessionEndTime]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center'>Game summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center text-center py-8 gap-8'>
          <div className='flex flex-col items-center'>
            <Label>Time</Label>
            <div className='font-bold text-2xl'>{gameTime}</div>
          </div>
          <div className='flex flex-col items-center'>
            <Label>Points earned</Label>
            {/* TODO: Calculate points earned from memo game */}
            <div className='font-bold text-2xl'>+10</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex items-center gap-4'>
        <Button onClick={newSessionHandler}>Play again</Button>
        <Button onClick={endSessionHandler} variant='secondary'>
          Go to dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}
