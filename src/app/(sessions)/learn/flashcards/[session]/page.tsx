'use client'

import FlashcardsSession from '#/components/flashcards/FlashcardsSession'
import { ROUTES } from '#/constants/router'
import { useAppSession } from '#/hooks/app-session'

export default function FlashcardsSessionPage() {
  const { sessionId } = useAppSession(ROUTES.flashcards)

  if (!sessionId) return null

  return (
    <div className='mx-auto max-w-[420px] w-full'>
      <FlashcardsSession />
    </div>
  )
}
