'use client'

import { trpc } from '#/app/_trpc/client'
import FlashcardsSession from '#/components/flashcards/FlashcardsSession'
import { KanjiItemJlptLevel } from '#/schemas/kanji'
import { useSearchParams } from 'next/navigation'

export default function FlashcardsSessionPage() {
  const params = useSearchParams()
  const level = params.get('level') as KanjiItemJlptLevel | null

  // TODO: Fetch kanji set based on selected level
  const { data: kanjiSet, isLoading } =
    trpc.flashcards.getFlashcardsSessionKanji.useQuery(level ?? undefined)

  if (isLoading) {
    // TODO: Implement loading spinner
    return 'Loading'
  }

  if (!kanjiSet) return null

  return (
    <div className='mx-auto max-w-[420px] w-full'>
      <FlashcardsSession kanjiSet={kanjiSet} />
    </div>
  )
}
