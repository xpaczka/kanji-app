"use client"

import { useMemoGame } from "#/hooks"
import { calculateTimeDifferenceToFormat } from "#/lib/utils"
import MemoGameSummary from "../memo-game/MemoGameSummary"
import { Spinner } from "../ui/spinner"
import MemoGameItem from "./MemoGameItem"

export default function MemoGame() {
  const {
    cards,
    cardsRevealed,
    toggleCard,
    isLoading,
    gameWon,
    endGame,
    newGame,
    gameStartTime,
    currentTime,
    guessCount
  } = useMemoGame()

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
        endSessionHandler={endGame}
        newSessionHandler={newGame}
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
