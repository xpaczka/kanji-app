import {
  getAllKanjiQuery,
  getKanjiByLevelQuery,
  updateUserKanjiHistory
} from "#/database/queries"
import { DatabaseKanji, kanjiItemJlptLevelSchema } from "#/database/schema"
import { getRandomKanjiSet } from "#/lib/kanji"
import { kanjiSessionItemSchema } from "#/schemas/kanji"
import { protectedProcedure, router } from "#/server/trpc"
import { TRPCError } from "@trpc/server"

const KANJI_SESSION_COUNT = 10

export const flashcardsRouter = router({
  getFlashcardsSessionKanji: protectedProcedure
    .input(kanjiItemJlptLevelSchema.optional())
    .query(async ({ input }): Promise<DatabaseKanji[]> => {
      const currentLevelKanji = input
        ? await getKanjiByLevelQuery(input)
        : await getAllKanjiQuery()

      return getRandomKanjiSet(currentLevelKanji, KANJI_SESSION_COUNT)
    }),
  updateUserKanjiHistory: protectedProcedure
    .input(kanjiSessionItemSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }

      await updateUserKanjiHistory(ctx.userId, input)
    })
})
