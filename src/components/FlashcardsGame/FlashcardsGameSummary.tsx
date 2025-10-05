"use client"

import { DateTime } from "luxon"
import { useFlashcardsGameSummary } from "#/hooks"
import {
  KanjiSessionSetItem,
  FlashcardGameItemEvaluation
} from "#/schemas/kanji"
import { useWindowSize } from "usehooks-ts"
import Confetti from "react-confetti"
import { GameButton } from "../Game"

type FlashcardsGameSummaryProps = {
  kanjiSet: KanjiSessionSetItem[]
  sessionStartTime: DateTime | null
  onNewSessionClick: () => void
  onEndSessionClick: () => void
}

const EVALUATION_VARIANTS: Record<FlashcardGameItemEvaluation, string> = {
  [FlashcardGameItemEvaluation.FAIL]: "bg-red-400",
  [FlashcardGameItemEvaluation.HARD]: "bg-orange-400",
  [FlashcardGameItemEvaluation.GOOD]: "bg-yellow-400",
  [FlashcardGameItemEvaluation.EASY]: "bg-green-400"
}

const mapEvaluationToColor = (evaluation: FlashcardGameItemEvaluation) =>
  EVALUATION_VARIANTS[evaluation]

export default function FlashcardsGameSummary({
  kanjiSet,
  sessionStartTime,
  onNewSessionClick,
  onEndSessionClick
}: FlashcardsGameSummaryProps) {
  const { timeSpent } = useFlashcardsGameSummary(sessionStartTime)

  const { width, height } = useWindowSize()

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
              <div className="text-4xl font-bold">{timeSpent}</div>
            </div>
            <div className="flex w-full flex-col items-center">
              <p className="text-sm text-gray-600">Kanji evaluation</p>
              <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-2">
                {kanjiSet.map(({ kanji, evaluation }, index) => (
                  <div
                    key={`${kanji}-${index}`}
                    className="flex w-full items-center justify-between gap-2"
                  >
                    <div className="w-12 text-3xl font-bold">{kanji}</div>
                    <div
                      className={`flex-1 rounded-md ${mapEvaluationToColor(evaluation)} p-1`}
                    >
                      {evaluation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <GameButton onClick={onNewSessionClick} label="Play again" />
            <GameButton onClick={onEndSessionClick} label="Go to dashboard" />
          </div>
        </div>
      </div>
    </>
  )
}
