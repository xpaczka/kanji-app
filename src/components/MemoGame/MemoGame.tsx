"use client"

import { useMemoGame } from "#/hooks"
import { calculateTimeDifferenceToFormat } from "#/utils"
import MemoGameSummary from "./MemoGameSummary"
import MemoGameItem from "./MemoGameItem"
import { GameContainer } from "../Game"

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

  return (
    <GameContainer
      isLoading={isLoading}
      items={cards}
      gameCompleted={gameWon}
      summaryComponent={
        <MemoGameSummary
          gameStartTimestamp={gameStartTime}
          guessCount={guessCount}
          endGame={endGame}
          newGame={newGame}
        />
      }
      content={
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
      }
    />
  )
}
