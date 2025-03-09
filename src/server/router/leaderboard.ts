import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

const leaderboardKeySchema = z.enum([
  'overallLeaderboard',
  'learnLeaderboard',
  'gamesLeaderboard',
])

const LEADERBOARD_ITEMS = {
  overallLeaderboard: [
    { username: 'user1', score: 24500 },
    { username: 'user2', score: 21500 },
    { username: 'user3', score: 37500 },
    { username: 'user4', score: 1890 },
    { username: 'user5', score: 24010 },
    { username: 'user6', score: 14100 },
  ],
  learnLeaderboard: [
    { username: 'learner1', score: 9800 },
    { username: 'learner2', score: 15600 },
    { username: 'learner3', score: 13450 },
    { username: 'learner4', score: 4500 },
    { username: 'learner5', score: 12100 },
    { username: 'learner6', score: 8900 },
  ],
  gamesLeaderboard: [
    { username: 'gamer1', score: 40500 },
    { username: 'gamer2', score: 38200 },
    { username: 'gamer3', score: 42750 },
    { username: 'gamer4', score: 19800 },
    { username: 'gamer5', score: 25600 },
    { username: 'gamer6', score: 31200 },
  ],
}

export const leaderboardRouter = router({
  getAllLeaderboards: publicProcedure.query(async () => LEADERBOARD_ITEMS),
  getLeaderboard: publicProcedure
    .input(z.object({ key: leaderboardKeySchema }))
    .query(({ input }) => LEADERBOARD_ITEMS[input.key]),
})
