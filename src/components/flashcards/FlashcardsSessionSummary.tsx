"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "#/components/ui/card"
import { Button } from "#/components/ui/button"
import { Label } from "#/components/ui/label"
import { DateTime } from "luxon"
import { useFlashcardsSessionSummary } from "#/hooks"
import { KanjiSessionSetItem } from "#/schemas/kanji"

type FlashcardsSessionSummaryProps = {
  kanjiSet: KanjiSessionSetItem[]
  sessionStartTime: DateTime | null
  onNewSessionClick: () => void
  onEndSessionClick: () => void
}

export default function FlashcardsSessionSummary({
  kanjiSet,
  sessionStartTime,
  onNewSessionClick,
  onEndSessionClick
}: FlashcardsSessionSummaryProps) {
  const { timeSpent } = useFlashcardsSessionSummary(sessionStartTime)

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-10 grid grid-cols-2 gap-x-8 gap-y-2">
          {kanjiSet.map(({ kanji, evaluation }, index) => (
            <div
              key={`${kanji}-${index}`}
              className="flex w-full items-center justify-between gap-2"
            >
              <div className="text-3xl font-bold">{kanji}</div>
              <div>{evaluation}</div>
              {/* TODO: Calculate new grade */}
              <div>70%</div>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col items-center">
            <Label>Time spent</Label>
            <div className="text-3xl font-bold">{timeSpent}</div>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <Label>Points earned</Label>
            {/* TODO: Add function calculating points */}
            <div className="text-3xl font-bold">+10</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <Button
          className="w-[200px] cursor-pointer"
          onClick={onNewSessionClick}
        >
          New session
        </Button>
        <Button
          className="w-[200px] cursor-pointer"
          onClick={onEndSessionClick}
          variant="secondary"
        >
          Go to dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}
