import { database } from '#/database'
import { kanjiTable } from '#/database/schema'
import { KanjiItem, kanjiItemJlptLevel } from '#/schemas/kanji'
import { publicProcedure, router } from '#/server/trpc'
import { eq } from 'drizzle-orm'

const KANJI_SESSION_COUNT = 10

const getRandomKanjiSet = (
  kanjiSet: KanjiItem[],
  count: number = KANJI_SESSION_COUNT
): KanjiItem[] => {
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
