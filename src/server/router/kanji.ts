import { publicProcedure, router } from "../trpc"
import { TRPCError } from "@trpc/server"

export const kanjiRouter = router({
  getAllKanji: publicProcedure.query(async ({ ctx }) => {
    const { data: items, error } = await ctx.database
      .from("kanji")
      .select("*")
      .range(0, 19)
      .order("kanji")

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }

    return items
  })
})
