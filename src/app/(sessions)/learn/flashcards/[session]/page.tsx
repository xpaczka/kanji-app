'use client'

import FlashcardsSession from '#/components/flashcards/FlashcardsSession'
import { useAppSession } from '#/hooks/app-session'

export default function FlashcardsSessionPage() {
  useAppSession('/learn/flashcards')

  return (
    <div className='mx-auto max-w-[420px] w-full'>
      <FlashcardsSession />
    </div>
  )
}
