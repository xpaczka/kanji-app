import { MEMO_GAME_KANJI_COUNT } from "#/constants/memo-game"
import { getKanjiByLevelQuery } from "#/database/queries"
import { getRandomKanjiSet } from "#/lib/kanji"
import { MemoGameItem } from "#/schemas/games"
import { publicProcedure, router } from "#/server/trpc"

export const memoGameRouter = router({
  getMemoGameKanji: publicProcedure.query(async (): Promise<MemoGameItem[]> => {
    // TODO: Fetch only already discovered kanji
    const kanji = await getKanjiByLevelQuery("jlpt-n5")
    const kanjiSet = getRandomKanjiSet(kanji, MEMO_GAME_KANJI_COUNT)

    return kanjiSet.map(({ kanji, meanings }) => ({
      kanji,
      meaning: meanings[0]
    }))
  })
})
