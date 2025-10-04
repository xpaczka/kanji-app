"use client"

import { useFlashcardsGame } from "#/hooks"
import { Switch } from "#/components/ui/switch"
import FlashcardSessionItem from "../flashcards/FlashcardsSessionItem"
import FlashcardsGameSummary from "./FlashcardsGameSummary"
import GameContainer from "../GameContainer"

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
    showRomaji,
    setShowRomaji,
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
            <FlashcardSessionItem
              kanji={kanjiSet[kanjiIndex]}
              isRevealed={isRevealed}
              showRomaji={showRomaji}
              onEvaluateClick={evaluateKanji}
              onRevealClick={() => setIsRevealed(true)}
            />
            <div className="mt-4 flex items-center gap-2">
              <Switch
                checked={showRomaji}
                onCheckedChange={() => setShowRomaji((prev) => !prev)}
              />
              <p>Show romaji</p>
            </div>
          </div>
        )
      }
    />
  )
}
