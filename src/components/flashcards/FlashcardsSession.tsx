'use client'

import { KanjiItem } from '#/schemas/kanji'
import { useCallback, useState } from 'react'
import FlashcardSessionItem from './FlashcardsSessionItem'

type FlashcardsSessionProps = {
  kanjiSet: KanjiItem[]
}

export default function FlashcardsSession({
  kanjiSet,
}: FlashcardsSessionProps) {
  const [kanjiIndex, setKanjiIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const evaluateKanjiHandler = useCallback(() => {
    if (kanjiIndex === kanjiSet.length - 1) return

    setKanjiIndex((prev) => prev + 1)
    setIsRevealed(false)
  }, [kanjiIndex, kanjiSet.length])

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
