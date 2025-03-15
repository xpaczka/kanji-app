import {
  flashcardsRouter,
  leaderboardRouter,
  learnRouter,
  userRouter,
  sessionRouter,
} from './router'
import { router } from './trpc'

export const appRouter = router({
  flashcards: flashcardsRouter,
  leaderboard: leaderboardRouter,
  learn: learnRouter,
  user: userRouter,
  session: sessionRouter,
})

export type AppRouter = typeof appRouter
