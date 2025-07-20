import { getAllKanjiQuery, getUserKanjiHistory } from "#/database/queries"
import { UserKanjiHistory } from "#/schemas"
import { protectedProcedure, router } from "../trpc"
import { z } from "zod"

export type UserDiscoveredKanjiCount = z.infer<
  typeof userDiscoveredKanjiCountSchema
>

export const userDiscoveredKanjiCountSchema = z.object({
  discoveredKanji: z.number(),
  allKanji: z.number()
})

export const learnRouter = router({
  getDiscoveredKanji: protectedProcedure.query(
    async ({ ctx }): Promise<UserKanjiHistory[]> =>
      await getUserKanjiHistory(ctx.database)
  ),
  getRecentKanji: protectedProcedure.query(
    async ({ ctx }): Promise<UserKanjiHistory[]> => {
      const kanjiHistory = await getUserKanjiHistory(ctx.database)
      return kanjiHistory.length ? kanjiHistory.slice(0, 5) : []
    }
  ),
  getDiscoveredKanjiCount: protectedProcedure.query(
    async ({ ctx }): Promise<UserDiscoveredKanjiCount | null> => {
      const allKanji = await getAllKanjiQuery(ctx.database)
      const kanjiHistory = await getUserKanjiHistory(ctx.database)

      if (!allKanji || !kanjiHistory) return null

      return {
        discoveredKanji: kanjiHistory.length,
        allKanji: Math.max(allKanji.length, 1)
      }
    }
  )
})
