import { leaderboardRouter } from './router/leaderboard'
import { router } from './trpc'

export const appRouter = router({
  leaderboard: leaderboardRouter,
})

export type AppRouter = typeof appRouter
