import { database } from '#/database'
import {
  DatabaseKanji,
  kanjiItemJlptLevel,
  kanjiTable,
} from '#/database/schema'
import { getRandomKanjiSet } from '#/lib/utils'
import { publicProcedure, router } from '#/server/trpc'
import { eq } from 'drizzle-orm'

const KANJI_SESSION_COUNT = 10

export const flashcardsRouter = router({
  getFlashcardsSessionKanji: publicProcedure
    .input(kanjiItemJlptLevel.optional())
    .query(async ({ input }): Promise<DatabaseKanji[]> => {
      const currentLevelKanjis = input
        ? await database
            .select()
            .from(kanjiTable)
            .where(eq(kanjiTable.level, input))
        : await database.select().from(kanjiTable)

      return getRandomKanjiSet(currentLevelKanjis, KANJI_SESSION_COUNT)
    }),
})
