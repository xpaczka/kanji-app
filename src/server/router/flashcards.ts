import { database } from '#/database'
import {
  DatabaseKanji,
  kanjiItemJlptLevel,
  kanjiTable,
} from '#/database/schema'
import { publicProcedure, router } from '#/server/trpc'
import { eq } from 'drizzle-orm'

const KANJI_SESSION_COUNT = 10

const getRandomKanjiSet = (
  kanjiSet: DatabaseKanji[],
  count: number = KANJI_SESSION_COUNT
): DatabaseKanji[] => {
  const uniqueKanjiSet = Array.from(
    new Map(kanjiSet.map((item) => [item.kanji, item])).values()
  )

  const setSize = uniqueKanjiSet.length

  if (count >= setSize) return uniqueKanjiSet

  const newKanjiSet = [...uniqueKanjiSet]

  for (let i = setSize - 1; i > setSize - count - 1; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1))

    ;[newKanjiSet[i], newKanjiSet[newIndex]] = [
      newKanjiSet[newIndex],
      newKanjiSet[i],
    ]
  }

  return newKanjiSet.slice(setSize - count)
}

export const flashcardsRouter = router({
  getFlashcardsSessionKanji: publicProcedure
    .input(kanjiItemJlptLevel.optional())
    .query(async ({ input }) => {
      const currentLevelKanjis = input
        ? await database
            .select()
            .from(kanjiTable)
            .where(eq(kanjiTable.level, input))
        : await database.select().from(kanjiTable)

      return getRandomKanjiSet(currentLevelKanjis)
    }),
})
