"use client"

import { toRomaji } from "wanakana"
import { Card, CardContent, CardFooter } from "#/components/ui/card"
import { Button } from "#/components/ui/button"
import FlashcardsSessionReading from "./FlashcardsSessionReading"
import { useMemo } from "react"
import { SessionItemEvaluation } from "#/schemas/kanji"
import { DatabaseKanji } from "#/types"

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
  onEvaluateClick
}: FlashcardSessionItemProps) {
  const onReadings = useMemo(
    () =>
      showRomaji
        ? toRomaji(kanji.on_readings.join(", "))
        : kanji.on_readings.join(", "),
    [kanji.on_readings, showRomaji]
  )

  const kunReadings = useMemo(
    () =>
      showRomaji
        ? toRomaji(kanji.kun_readings.join(", "))
        : kanji.kun_readings.join(", "),
    [kanji.kun_readings, showRomaji]
  )

  if (isRevealed) {
    return (
      <Card className="aspect-square w-full items-center p-12">
        <CardContent className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              {kanji.on_readings.length > 0 && (
                <FlashcardsSessionReading tooltipContent="On-reading is usually used when the kanji is a part of a compound (two or more kanji characters are placed side by site)">
                  On {kanji.on_readings.length > 1 ? "readings" : "reading"}
                </FlashcardsSessionReading>
              )}
              <p className="text-2xl font-bold">{onReadings}</p>
            </div>
            <div className="flex flex-col items-center">
              {kanji.kun_readings.length > 0 && (
                <FlashcardsSessionReading tooltipContent="Kun-reading is used when the kanji is used on its own, either as a complete noun or as adjective stems and verb stems">
                  Kun {kanji.kun_readings.length > 1 ? "readings" : "reading"}
                </FlashcardsSessionReading>
              )}
              <p className="text-2xl font-bold">{kunReadings}</p>
            </div>
          </div>
          <p className="italic">{kanji.meanings.join(", ")}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          <Button
            className="cursor-pointer"
            size="lg"
            onClick={() => onEvaluateClick(SessionItemEvaluation.FAIL)}
          >
            Fail
          </Button>
          <Button
            className="cursor-pointer"
            size="lg"
            onClick={() => onEvaluateClick(SessionItemEvaluation.HARD)}
          >
            Hard
          </Button>
          <Button
            className="cursor-pointer"
            size="lg"
            onClick={() => onEvaluateClick(SessionItemEvaluation.GOOD)}
          >
            Good
          </Button>
          <Button
            className="cursor-pointer"
            size="lg"
            onClick={() => onEvaluateClick(SessionItemEvaluation.EASY)}
          >
            Easy
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="aspect-square w-full items-center p-12">
      <CardContent className="flex flex-1 items-center justify-center text-9xl">
        {kanji.kanji}
      </CardContent>
      <CardFooter>
        <Button className="cursor-pointer" size="lg" onClick={onRevealClick}>
          Flip
        </Button>
      </CardFooter>
    </Card>
  )
}
