import { leaderboardRouter } from './router/leaderboard'
import { userRouter } from './router/user'
import { router } from './trpc'

export const appRouter = router({
  user: userRouter,
  leaderboard: leaderboardRouter,
})

export type AppRouter = typeof appRouter
