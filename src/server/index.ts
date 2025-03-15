import {
  flashcardsRouter,
  leaderboardRouter,
  learnRouter,
  userRouter,
} from './router'
import { router } from './trpc'

export const appRouter = router({
  flashcards: flashcardsRouter,
  leaderboard: leaderboardRouter,
  learn: learnRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
