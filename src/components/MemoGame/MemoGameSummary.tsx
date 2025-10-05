"use client"

import { useEffect, useMemo, useState } from "react"
import { DateTime } from "luxon"
import { calculateTimeDifferenceToFormat } from "#/utils"
import { useWindowSize } from "usehooks-ts"
import Confetti from "react-confetti"
import { BaseButton } from "../Misc"

type MemoGameSummaryProps = {
  gameStartTimestamp: DateTime | null
  guessCount: number
  endGame: () => void
  newGame: () => void
}

export default function MemoGameSummary({
  gameStartTimestamp,
  guessCount,
  endGame,
  newGame
}: MemoGameSummaryProps) {
  const [sessionEndTime, setSessionEndTime] = useState<DateTime | null>(null)

  useEffect(() => {
    setSessionEndTime(DateTime.now())
  }, [])

  const { width, height } = useWindowSize()

  const displayedGameTime = useMemo(
    () => calculateTimeDifferenceToFormat(gameStartTimestamp, sessionEndTime),
    [gameStartTimestamp, sessionEndTime]
  )

  return (
    <>
      <Confetti
        tweenDuration={500}
        width={width}
        height={height}
        recycle={false}
      />
      <div className="flex w-full justify-center">
        <div className="rounded-md border-2 border-gray-200 bg-white p-8 text-center">
          <div className="text-xl font-semibold">Game summary</div>
          <div className="flex flex-col items-center gap-8 py-8 text-center">
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600">Time</p>
              <div className="text-4xl font-bold">{displayedGameTime}</div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600">Guesses</p>
              <div className="text-4xl font-bold">{guessCount}</div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <BaseButton onClick={newGame} label="Play again" />
            <BaseButton onClick={endGame} label="Go to dashboard" />
          </div>
        </div>
      </div>
    </>
  )
}
