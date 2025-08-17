import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { TRPCError } from "@trpc/server"

export const kanjiRouter = router({
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
