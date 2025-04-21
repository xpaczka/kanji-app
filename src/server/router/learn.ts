import { getAllKanjiQuery, getUserKanjiHistory } from "#/database/queries"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"

export type UserDiscoveredKanjiCount = z.infer<
  typeof userDiscoveredKanjiCountSchema
>

const userIdSchema = z.string().nullable()

export const userDiscoveredKanjiCountSchema = z.object({
  discoveredKanji: z.number(),
  allKanji: z.number()
})

export const learnRouter = router({
  getDiscoveredKanji: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }) =>
      input ? await getUserKanjiHistory(input) : []
    ),
  getRecentKanji: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }) => {
      if (!input) return []

      const kanjiHistory = await getUserKanjiHistory(input)

      return kanjiHistory.slice(0, 5)
    }),
  getDiscoveredKanjiCount: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }): Promise<UserDiscoveredKanjiCount> => {
      if (!input) return { discoveredKanji: 0, allKanji: 1 }

      const allKanji = await getAllKanjiQuery()
      const kanjiHistory = await getUserKanjiHistory(input)

      return { discoveredKanji: kanjiHistory.length, allKanji: allKanji.length }
    })
})
