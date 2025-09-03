import { TRPCError } from "@trpc/server"
import { protectedProcedure, router } from "../trpc"

export const learnRouter = router({
  /**
   * QUERY: Get kanji for learn session
   */
  getLearnItems: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    const { data: items, error } = await ctx.database
      .rpc("get_learn_items", { user_auth_id: user.id })
      .select("*")

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }

    return items
  })
})
