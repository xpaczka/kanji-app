import { FLASHCARDS_GAME_KANJI_COUNT } from "#/constants"
import { getRandomKanjiSet } from "#/lib/kanji"
import { protectedProcedure, router } from "#/server/trpc"
import { TRPCError } from "@trpc/server"

export const flashcardsRouter = router({
  getFlashcardsGameKanji: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    const { data: items, error } = await ctx.database
      .rpc("get_user_kanji", { user_auth_id: user.id })
      .select("*")

    if (!items || items.length < FLASHCARDS_GAME_KANJI_COUNT) {
      return { items: [], count: items?.length ?? 0 }
    }

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }

    const itemsSet = getRandomKanjiSet(items, FLASHCARDS_GAME_KANJI_COUNT)

    return { items: itemsSet, count: itemsSet.length }
  })
})
