import { flashcardsRouter } from "#/server/router/flashcards"
import { kanjiRouter } from "./router/kanji"
import { leaderboardRouter } from "./router/leaderboard"
import { learnRouter } from "./router/learn"
import { memoGameRouter } from "./router/memo-game"
import { reviewRouter } from "./router/review"
import { userRouter } from "./router/user"
import { router } from "./trpc"

export const appRouter = router({
  user: userRouter,
  learn: learnRouter,
  review: reviewRouter,
  kanji: kanjiRouter,
  // ROUTES TO BE UPDATED OR REMOVED
  leaderboard: leaderboardRouter,
  flashcards: flashcardsRouter,
  memoGame: memoGameRouter
})

export type AppRouter = typeof appRouter
