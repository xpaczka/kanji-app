import { getAllKanjiQuery } from '#/database/queries'
import { getRandomKanjiSet } from '#/lib/kanji'
import { MemoGameItem } from '#/schemas/games'
import { publicProcedure, router } from '#/server/trpc'

export const MEMO_GAME_KANJI_COUNT = 8

export const memoGameRouter = router({
  getMemoGameKanji: publicProcedure.query(async (): Promise<MemoGameItem[]> => {
    const kanji = await getAllKanjiQuery()
    const kanjiSet = getRandomKanjiSet(kanji, MEMO_GAME_KANJI_COUNT)

    return kanjiSet.map(({ kanji, meanings }) => ({
      kanji,
      meaning: meanings[0],
    }))
  }),
})
