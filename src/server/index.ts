import { flashcardsRouter } from "#/server/router/flashcards"
import { kanjiRouter } from "./router/kanji"
import { learnRouter } from "./router/learn"
import { memoGameRouter } from "./router/memo-game"
import { reviewRouter } from "./router/review"
import { router } from "./trpc"

export const appRouter = router({
  learn: learnRouter,
  review: reviewRouter,
  kanji: kanjiRouter,
  flashcards: flashcardsRouter,
  memoGame: memoGameRouter
})

export type AppRouter = typeof appRouter
