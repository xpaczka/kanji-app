"use client"

import { DatabaseKanjiTableItem, FlashcardsItemEvaluation } from "#/types"
import FlashcardsGameReading from "./FlashcardsGameReading"
import { motion } from "motion/react"
import FlashcardsGameItemButton from "./FlashcardsGameItemButton"
import { useEffect, useState } from "react"

type FlashcardsGameItemProps = {
  kanji: DatabaseKanjiTableItem
  isRevealed: boolean
  onRevealClick: () => void
  onEvaluateClick: (evalution: FlashcardsItemEvaluation) => void
}

export default function FlashcardsGameItem({
  kanji: kanjiItem,
  isRevealed,
  onRevealClick,
  onEvaluateClick
}: FlashcardsGameItemProps) {
  const { kanji, on_readings, kun_readings, meanings } = kanjiItem

  const [showContent, setShowContent] = useState(true)

  useEffect(() => {
    setShowContent(isRevealed)
  }, [setShowContent, isRevealed])

  return (
    <motion.div
      className="relative h-96 w-96"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-gray-400 bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-center">
            <div className="inline-flex flex-col items-center justify-center">
              <div className="mb-16 text-9xl font-bold">{kanji}</div>
              <FlashcardsGameItemButton onClick={onRevealClick}>
                Flip
              </FlashcardsGameItemButton>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-gray-400 bg-white"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {showContent && (
            <div className="w-full items-center p-4">
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="mb-6 flex flex-col items-center gap-3">
                  <div className="flex flex-col items-center">
                    {on_readings.length > 0 && (
                      <FlashcardsGameReading tooltipContent="On-reading is usually used when the kanji is a part of a compound (two or more kanji characters are placed side by site)">
                        On {on_readings.length > 1 ? "readings" : "reading"}
                      </FlashcardsGameReading>
                    )}
                    <p className="text-2xl font-bold">{on_readings}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    {kun_readings.length > 0 && (
                      <FlashcardsGameReading tooltipContent="Kun-reading is used when the kanji is used on its own, either as a complete noun or as adjective stems and verb stems">
                        Kun {kun_readings.length > 1 ? "readings" : "reading"}
                      </FlashcardsGameReading>
                    )}
                    <p className="text-2xl font-bold">{kun_readings}</p>
                  </div>
                </div>
                <p className="italic">{meanings.join(", ")}</p>
              </div>
              <div className="mt-4 grid w-full grid-cols-2 items-center gap-4">
                <FlashcardsGameItemButton
                  onClick={() => onEvaluateClick(FlashcardsItemEvaluation.FAIL)}
                >
                  {FlashcardsItemEvaluation.FAIL.toUpperCase()}
                </FlashcardsGameItemButton>
                <FlashcardsGameItemButton
                  onClick={() => onEvaluateClick(FlashcardsItemEvaluation.HARD)}
                >
                  {FlashcardsItemEvaluation.HARD.toUpperCase()}
                </FlashcardsGameItemButton>
                <FlashcardsGameItemButton
                  onClick={() => onEvaluateClick(FlashcardsItemEvaluation.GOOD)}
                >
                  {FlashcardsItemEvaluation.GOOD.toUpperCase()}
                </FlashcardsGameItemButton>
                <FlashcardsGameItemButton
                  onClick={() => onEvaluateClick(FlashcardsItemEvaluation.EASY)}
                >
                  {FlashcardsItemEvaluation.EASY.toUpperCase()}
                </FlashcardsGameItemButton>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
