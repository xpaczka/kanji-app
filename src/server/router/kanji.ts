import { z } from "zod"
import { protectedProcedure, publicProcedure, router } from "../trpc"
import { TRPCError } from "@trpc/server"

export const kanjiRouter = router({
  /**
   * MUTATION: Endpoint to create or update entry in user_kanji table
   */
  updateUserKanji: protectedProcedure
    .input(
      z.object({
        kanjiId: z.string(),
        stage: z.number(),
        nextReviewAt: z.string().nullable()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { user, database } = ctx
      const { kanjiId, stage, nextReviewAt } = input

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const { error } = await database.from("user_kanji").upsert({
        kanji_id: kanjiId,
        stage,
        user_id: user.id,
        next_review_at: nextReviewAt
      })

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message
        })
      }
    }),
  /**
   * QUERY: Endpoint used to get list of all kanji with pagination
   */
  getKanjiWithPagination: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(0),
        limit: z.number().min(1).max(100).default(20)
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, limit } = input
      const start = (page - 1) * limit
      const end = start + limit - 1

      const { data: items, error } = await ctx.database
        .from("kanji")
        .select("*")
        .order("kanji")
        .range(start, end)

      if (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }

      return {
        items,
        hasNextPage: items.length === limit
      }
    })
})
