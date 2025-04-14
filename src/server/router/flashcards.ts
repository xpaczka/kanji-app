import { getAllKanjiQuery, getKanjiByLevelQuery } from "#/database/queries"
import { DatabaseKanji, kanjiItemJlptLevel } from "#/database/schema"
import { getRandomKanjiSet } from "#/lib/kanji"
import { publicProcedure, router } from "#/server/trpc"

const KANJI_SESSION_COUNT = 10

export const flashcardsRouter = router({
  getFlashcardsSessionKanji: publicProcedure
    .input(kanjiItemJlptLevel.optional())
    .query(async ({ input }): Promise<DatabaseKanji[]> => {
      const currentLevelKanjis = input
        ? await getKanjiByLevelQuery(input)
        : await getAllKanjiQuery()

      return getRandomKanjiSet(currentLevelKanjis, KANJI_SESSION_COUNT)
    })
})
