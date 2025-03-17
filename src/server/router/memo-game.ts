import { database } from '#/database'
import { kanjiTable } from '#/database/schema'
import { getRandomKanjiSet } from '#/lib/utils'
import { MemoGameItem } from '#/schemas/games'
import { publicProcedure, router } from '#/server/trpc'

export const MEMO_GAME_KANJI_COUNT = 8

export const memoGameRouter = router({
  getMemoGameKanji: publicProcedure.query(async (): Promise<MemoGameItem[]> => {
    const kanji = await database.select().from(kanjiTable)
    const kanjiSet = getRandomKanjiSet(kanji, MEMO_GAME_KANJI_COUNT)

    return kanjiSet.map(({ kanji, meanings }) => ({
      kanji,
      meaning: meanings[0],
    }))
  }),
})
