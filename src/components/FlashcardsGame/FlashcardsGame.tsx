"use client"

import { useFlashcardsGame } from "#/hooks"
import FlashcardsGameSummary from "./FlashcardsGameSummary"
import FlashcardsGameItem from "./FlashcardsGameItem"
import { GameContainer } from "../Game"

export default function FlashcardsGame() {
  const {
    kanjiSet,
    isLoading,
    isRevealed,
    setIsRevealed,
    kanjiIndex,
    sessionSet,
    sessionCompleted,
    sessionStartTime,
    evaluateKanji,
    newSession,
    endSession
  } = useFlashcardsGame()

  return (
    <GameContainer
      isLoading={isLoading}
      items={kanjiSet}
      gameCompleted={sessionCompleted}
      summaryComponent={
        <FlashcardsGameSummary
          kanjiSet={sessionSet}
          sessionStartTime={sessionStartTime}
          onNewSessionClick={newSession}
          onEndSessionClick={endSession}
        />
      }
      content={
        kanjiSet && (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-lg font-bold">
              {kanjiIndex + 1} / {kanjiSet.length}
            </p>
            <FlashcardsGameItem
              kanji={kanjiSet[kanjiIndex]}
              isRevealed={isRevealed}
              onEvaluateClick={evaluateKanji}
              onRevealClick={() => setIsRevealed(true)}
            />
          </div>
        )
      }
    />
  )
}
