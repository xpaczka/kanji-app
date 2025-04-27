"use client"

import FlashcardsSession from "#/components/flashcards/FlashcardsSession"
import { ROUTES } from "#/constants/router"
import { useAppSession } from "#/hooks"

export default function FlashcardsSessionPage() {
  const { sessionId } = useAppSession(ROUTES.flashcards)

  if (!sessionId) return null

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <FlashcardsSession />
    </div>
  )
}
