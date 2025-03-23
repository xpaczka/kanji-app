import {
  MEMO_GAME_GUESS_COOLDOWN,
  MEMO_GAME_KANJI_COUNT,
  MEMO_GAME_PERFECT_GAME_BONUS,
} from '#/constants/memo-game'

export type MemoGameChoice = {
  value: string
  index: number
} | null

export const checkMemoGamePairs = (
  pairs: { [key: string]: string },
  firstChoice: MemoGameChoice,
  secondChoice: MemoGameChoice
) => {
  if (!firstChoice || !secondChoice) return false

  return (
    pairs[firstChoice.value] === secondChoice.value ||
    pairs[secondChoice.value] === firstChoice.value
  )
}

export const calculateMemoGameScore = (
  guessCount: number,
  timeSpent: number,
  minGuesses: number = MEMO_GAME_KANJI_COUNT
): number => {
  // Initial game score
  const BASE_SCORE = 1000

  // Points deducted per second of active time
  const TIME_FACTOR = 2

  // Penalty for extra guesses
  const GUESS_PENALTY = 50

  // Cooldown time of every made guess
  const cooldownTime = MEMO_GAME_GUESS_COOLDOWN * minGuesses

  // Compute active time (excluding cooldown time)
  const activeTime = Math.max(0, timeSpent - cooldownTime)

  let score = BASE_SCORE - TIME_FACTOR * activeTime

  // Apply penalty for extra guesses
  if (guessCount > minGuesses) {
    score -= (guessCount - minGuesses) * GUESS_PENALTY
  }

  // Bonus for perfect play
  if (guessCount === minGuesses) {
    score += MEMO_GAME_PERFECT_GAME_BONUS
  }

  return Math.floor(Math.max(score, 0))
}
