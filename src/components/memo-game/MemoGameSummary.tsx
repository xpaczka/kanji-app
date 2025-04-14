import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "#/components/ui/card"
import { Button } from "#/components/ui/button"
import { Label } from "#/components/ui/label"
import { useEffect, useMemo, useState } from "react"
import { DateTime } from "luxon"
import { calculateTimeDifferenceToFormat } from "#/lib/utils"
import { calculateMemoGameScore } from "#/lib/memo-game"

type MemoGameSummaryProps = {
  gameStartTimestamp: DateTime | null
  guessCount: number
  endSessionHandler: () => void
  newSessionHandler: () => void
}

export default function MemoGameSummary({
  gameStartTimestamp,
  guessCount,
  endSessionHandler,
  newSessionHandler
}: MemoGameSummaryProps) {
  const [sessionEndTime, setSessionEndTime] = useState<DateTime | null>(null)

  useEffect(() => {
    setSessionEndTime(DateTime.now())
  }, [])

  const gameTime = useMemo(
    () =>
      sessionEndTime && gameStartTimestamp
        ? sessionEndTime.diff(gameStartTimestamp).as("seconds")
        : 0,
    [gameStartTimestamp, sessionEndTime]
  )

  const displayedGameTime = useMemo(
    () => calculateTimeDifferenceToFormat(gameStartTimestamp, sessionEndTime),
    [gameStartTimestamp, sessionEndTime]
  )

  const memoGameScore = useMemo(
    () => calculateMemoGameScore(guessCount, gameTime),
    [guessCount, gameTime]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Game summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-8 py-8 text-center">
          <div className="flex flex-col items-center">
            <Label>Time</Label>
            <div className="text-2xl font-bold">{displayedGameTime}</div>
          </div>
          <div className="flex flex-col items-center">
            <Label>Points earned</Label>
            <div className="text-2xl font-bold">{memoGameScore}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Button onClick={newSessionHandler}>Play again</Button>
        <Button onClick={endSessionHandler} variant="secondary">
          Go to dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}
