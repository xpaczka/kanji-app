import { z } from 'zod'

export const leaderboardKeySchema = z.enum([
  'overallLeaderboard',
  'learnLeaderboard',
  'gamesLeaderboard',
])

export const leaderboardPaginationSchema = z
  .object({
    from: z.number().nonnegative(),
    to: z.number().nonnegative(),
  })
  .refine((data) => data.to > data.from, {
    message: '"to" value must greater than "from" value',
    path: ['to'],
  })
  .optional()
