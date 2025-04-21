import { getAllKanjiQuery, getUserKanjiHistory } from "#/database/queries"
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
    async ({ ctx }) => await getUserKanjiHistory(ctx.userId)
  ),
  getRecentKanji: protectedProcedure.query(async ({ ctx }) => {
    const kanjiHistory = await getUserKanjiHistory(ctx.userId)

    return kanjiHistory.slice(0, 5)
  }),
  getDiscoveredKanjiCount: protectedProcedure.query(
    async ({ ctx }): Promise<UserDiscoveredKanjiCount | null> => {
      const allKanji = await getAllKanjiQuery()
      const kanjiHistory = await getUserKanjiHistory(ctx.userId)

      if (
        !allKanji ||
        !allKanji.length ||
        !kanjiHistory ||
        !kanjiHistory.length
      ) {
        return null
      }

      return { discoveredKanji: kanjiHistory.length, allKanji: allKanji.length }
    }
  )
})
