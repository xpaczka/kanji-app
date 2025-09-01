import { getAllKanjiQuery, getUserKanjiHistory } from "#/database/queries"
import { UserKanjiHistory } from "#/types"
import { TRPCError } from "@trpc/server"
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
  getLearnItems: protectedProcedure.query(async ({ ctx }) => {
    const { data: items, error } = await ctx.database
      .rpc("get_learn_items", { user_auth_id: ctx.user!.id })
      .select("*")

    if (error) {
      console.log(error)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }

    return items
  }),
  // DEPRECATED ROUTES
  getDiscoveredKanji: protectedProcedure.query(
    async ({ ctx }): Promise<UserKanjiHistory[]> => {
      const kanjiHistory = await getUserKanjiHistory(ctx.database)

      return (kanjiHistory as UserKanjiHistory[]) || []
    }
  ),
  getRecentKanji: protectedProcedure.query(
    async ({ ctx }): Promise<UserKanjiHistory[]> => {
      const kanjiHistory = await getUserKanjiHistory(ctx.database)

      if (!kanjiHistory || !kanjiHistory.length) return []

      return kanjiHistory.slice(0, 5) as UserKanjiHistory[]
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
