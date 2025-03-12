'use client'

import FlashcardSessionItem from './FlashcardsSessionItem'
import FlashcardsSessionSummary from './FlashcardsSessionSummary'
import { useFlashcardsSession } from '#/hooks/flashcards'
import { Spinner } from '#/components/ui/spinner'

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
    evaluateKanji,
    newSession,
    endSession,
  } = useFlashcardsSession()

  if (isLoading) {
    return (
      <Spinner size='large'>
        <span className='text-sm'>Fetching flashcards...</span>
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
    <div className='flex flex-col items-center'>
      <p className='font-bold text-lg mb-4'>
        {kanjiIndex + 1} / {kanjiSet.length}
      </p>
      <FlashcardSessionItem
        kanji={kanjiSet[kanjiIndex]}
        isRevealed={isRevealed}
        onEvaluateClick={evaluateKanji}
        onRevealClick={() => setIsRevealed(true)}
      />
    </div>
  )
}
