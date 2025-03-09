import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const LEADERBOARD_CHUNK = 5

const leaderboardKeySchema = z.enum([
  'overallLeaderboard',
  'learnLeaderboard',
  'gamesLeaderboard',
])

const leaderboardPaginationSchema = z
  .object({
    from: z.number().nonnegative(),
    to: z.number().nonnegative(),
  })
  .refine((data) => data.to > data.from, {
    message: '"to" value must greater than "from" value',
    path: ['to'],
  })
  .optional()

const LEADERBOARD_ITEMS = {
  overallLeaderboard: [
    { username: 'user1', score: 24500 },
    { username: 'user2', score: 21500 },
    { username: 'user3', score: 37500 },
    { username: 'user4', score: 1890 },
    { username: 'user5', score: 24010 },
    { username: 'user6', score: 14100 },
  ].sort((a, b) => b.score - a.score),
  learnLeaderboard: [
    { username: 'learner1', score: 9800 },
    { username: 'learner2', score: 15600 },
    { username: 'learner3', score: 13450 },
    { username: 'learner4', score: 4500 },
    { username: 'learner5', score: 12100 },
    { username: 'learner6', score: 8900 },
  ].sort((a, b) => b.score - a.score),
  gamesLeaderboard: [
    { username: 'gamer1', score: 40500 },
    { username: 'gamer2', score: 38200 },
    { username: 'gamer3', score: 42750 },
    { username: 'gamer4', score: 19800 },
    { username: 'gamer5', score: 25600 },
    { username: 'gamer6', score: 31200 },
  ].sort((a, b) => b.score - a.score),
}

const paginateLeaderboard = <T>(leaderboard: T[], from?: number, to?: number) =>
  leaderboard.slice(from ?? 0, to ?? LEADERBOARD_CHUNK)

export const leaderboardRouter = router({
  getAllLeaderboards: publicProcedure
    .input(leaderboardPaginationSchema)
    .query(async ({ input }) =>
      Object.fromEntries(
        Object.entries(LEADERBOARD_ITEMS).map(([key, value]) => [
          key,
          paginateLeaderboard(value, input?.from, input?.to),
        ])
      )
    ),
  getLeaderboard: publicProcedure
    .input(
      z.object({
        key: leaderboardKeySchema,
        pagination: leaderboardPaginationSchema,
      })
    )
    .query(({ input }) =>
      paginateLeaderboard(
        LEADERBOARD_ITEMS[input.key],
        input.pagination?.from,
        input.pagination?.to
      )
    ),
})
