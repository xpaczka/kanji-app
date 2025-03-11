'use client'

import { KanjiItem } from '#/schemas/kanji'
import { useCallback, useState } from 'react'
import FlashcardSessionItem from './FlashcardsSessionItem'
import FlashcardsSessionSummary, {
  KanjiSessionSet,
  SessionItemEvaluation,
} from './FlashcardsSessionSummary'
import { useNavigation } from '#/hooks/router'

type FlashcardsSessionProps = {
  kanjiSet: KanjiItem[]
}

export default function FlashcardsSession({
  kanjiSet,
}: FlashcardsSessionProps) {
  const [kanjiIndex, setKanjiIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [sessionSet, setSessionSet] = useState<KanjiSessionSet[]>([])

  const { navigate } = useNavigation()

  const evaluateKanjiHandler = useCallback(
    (evaluation: SessionItemEvaluation) => {
      if (kanjiIndex === kanjiSet.length - 1) {
        setSessionCompleted(true)
      }

      setSessionSet((prev) => [
        ...prev,
        { kanji: kanjiSet[kanjiIndex].kanji, evaluation },
      ])

      setKanjiIndex((prev) => prev + 1)
      setIsRevealed(false)
    },
    [kanjiIndex, kanjiSet]
  )

  // TODO: Implement new session handler
  const newSessionHandler = useCallback(() => {}, [])

  const endSessionHandler = useCallback(() => {
    navigate('/learn/flashcards')

    setKanjiIndex(0)
    setIsRevealed(false)
    setSessionCompleted(false)
    setSessionSet([])
  }, [navigate])

  if (sessionCompleted) {
    return (
      <FlashcardsSessionSummary
        kanjiSet={sessionSet}
        onNewSessionClick={newSessionHandler}
        onEndSessionClick={endSessionHandler}
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
        onEvaluateClick={evaluateKanjiHandler}
        onRevealClick={() => setIsRevealed(true)}
      />
    </div>
  )
}
