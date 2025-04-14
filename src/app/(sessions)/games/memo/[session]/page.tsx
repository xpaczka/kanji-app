"use client"

import MemoGameItem from "#/components/memo-game/MemoGameItem"
import MemoGameSummary from "#/components/memo-game/MemoGameSummary"
import { Spinner } from "#/components/ui/spinner"
import { ROUTES } from "#/constants/router"
import { useAppSession } from "#/hooks/app-session"
import { useMemoGameCards } from "#/hooks/memo-game"
import { calculateTimeDifferenceToFormat } from "#/lib/utils"

export default function MemoGameSessionPage() {
  const {
    cards,
    cardsRevealed,
    toggleCard,
    isLoading,
    gameWon,
    endSession,
    newSession,
    gameStartTime,
    currentTime,
    guessCount
  } = useMemoGameCards()

  const { sessionId } = useAppSession(ROUTES.gamesDashboard)

  if (!sessionId) return null

  if (isLoading) {
    return (
      <Spinner size="large">
        <span className="text-sm">Loading your game...</span>
      </Spinner>
    )
  }

  if (gameWon) {
    return (
      <MemoGameSummary
        gameStartTimestamp={gameStartTime}
        guessCount={guessCount}
        endSessionHandler={endSession}
        newSessionHandler={newSession}
      />
    )
  }

  if (!cards) return null

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-10">
        <div>
          Time:{" "}
          <strong>
            {calculateTimeDifferenceToFormat(gameStartTime, currentTime)}
          </strong>
        </div>
        <div>
          Guesses: <strong>{guessCount}</strong>
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {cards &&
          cards.map((card, index) => (
            <MemoGameItem
              key={`${card}-${index}`}
              content={card}
              isRevealed={cardsRevealed[index]}
              onClick={() => toggleCard(card, index)}
            />
          ))}
      </div>
    </div>
  )
}
