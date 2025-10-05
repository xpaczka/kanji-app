import { MEMO_GAME_KANJI_COUNT } from "#/constants/game"
import { protectedProcedure, router } from "#/server/trpc"
import { getRandomKanjiSet } from "#/utils"
import { TRPCError } from "@trpc/server"

export const memoGameRouter = router({
  /**
   * QUERY: Retrieve kanji for memo game cards
   */
  getMemoGameKanji: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    const { data: items, error } = await ctx.database
      .rpc("get_user_kanji", { user_auth_id: user.id })
      .select("*")

    if (!items || items.length < MEMO_GAME_KANJI_COUNT) {
      return { items: [], count: items?.length ?? 0 }
    }

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }

    const itemsSet = getRandomKanjiSet(items, MEMO_GAME_KANJI_COUNT)

    return {
      items: itemsSet.map(({ kanji, meanings }) => ({
        kanji,
        meaning: meanings[0]
      })),
      count: itemsSet.length
    }
  })
})
