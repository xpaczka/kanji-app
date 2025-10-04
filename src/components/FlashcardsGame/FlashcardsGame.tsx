"use client"

import { useFlashcardsSession } from "#/hooks"
import { Switch } from "#/components/ui/switch"
import FlashcardSessionItem from "../flashcards/FlashcardsSessionItem"
import FlashcardsSessionSummary from "../flashcards/FlashcardsSessionSummary"
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
  } = useFlashcardsSession()

  return (
    <GameContainer
      isLoading={isLoading}
      items={kanjiSet}
      gameCompleted={sessionCompleted}
      summaryComponent={
        <FlashcardsSessionSummary
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
