import { leaderboardRouter } from './router/leaderboard'
import { learnRouter } from './router/learn'
import { userRouter } from './router/user'
import { router } from './trpc'

export const appRouter = router({
  user: userRouter,
  learn: learnRouter,
  leaderboard: leaderboardRouter,
})

export type AppRouter = typeof appRouter
