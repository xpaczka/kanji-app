import { TRPCError } from "@trpc/server"
import { protectedProcedure, router } from "../trpc"
import { getItemsForLearnOrReview } from "#/lib/utils"

export const reviewRouter = router({
  // TODO: Get only items user has learned
  getReviewItems: protectedProcedure.query(async ({ ctx }) => {
    const { data: items, error } = await ctx.database
      .from("kanji")
      .select("kanji, meanings, on_readings")
      .match({ level: "jlpt-n5" })
      .limit(5)

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }

    return getItemsForLearnOrReview(items)
  })
})
