import {
  getAllKanjiQuery,
  getKanjiByLevelQuery,
  updateUserKanjiHistory
} from "#/database/queries"
import { DatabaseKanji, kanjiItemJlptLevel } from "#/database/schema"
import { getRandomKanjiSet } from "#/lib/kanji"
import { kanjiSessionItemSchema } from "#/schemas/kanji"
import { publicProcedure, router } from "#/server/trpc"
import { z } from "zod"

const KANJI_SESSION_COUNT = 10

export const flashcardsRouter = router({
  getFlashcardsSessionKanji: publicProcedure
    .input(kanjiItemJlptLevel.optional())
    .query(async ({ input }): Promise<DatabaseKanji[]> => {
      const currentLevelKanji = input
        ? await getKanjiByLevelQuery(input)
        : await getAllKanjiQuery()

      return getRandomKanjiSet(currentLevelKanji, KANJI_SESSION_COUNT)
    }),
  updateUserKanjiHistory: publicProcedure
    .input(z.object({ userId: z.string(), kanji: kanjiSessionItemSchema }))
    .mutation(async ({ input }) => {
      if (!input) return
      await updateUserKanjiHistory(input.userId, input.kanji)
    })
})
