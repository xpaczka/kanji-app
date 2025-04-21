"use client"

import FlashcardSessionItem from "./FlashcardsSessionItem"
import FlashcardsSessionSummary from "./FlashcardsSessionSummary"
import { useFlashcardsSession } from "#/hooks/flashcards"
import { Spinner } from "#/components/ui/spinner"
import { Switch } from "#/components/ui/switch"

export default function FlashcardsSession() {
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

  if (isLoading) {
    return (
      <Spinner size="large">
        <span className="text-sm">Fetching flashcards...</span>
      </Spinner>
    )
  }

  if (!kanjiSet) return null

  if (sessionCompleted) {
    return (
      <FlashcardsSessionSummary
        kanjiSet={sessionSet}
        sessionStartTime={sessionStartTime}
        onNewSessionClick={newSession}
        onEndSessionClick={endSession}
      />
    )
  }

  return (
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
