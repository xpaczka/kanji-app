import { MEMO_GAME_KANJI_COUNT } from "#/constants/memo-game"
import { getKanjiByLevelQuery } from "#/database/queries"
import { getRandomKanjiSet } from "#/lib/kanji"
import { MemoGameItem } from "#/schemas/games"
import { protectedProcedure, router } from "#/server/trpc"
import { TRPCError } from "@trpc/server"

export const memoGameRouter = router({
  getMemoGameKanji: protectedProcedure.query(
    async ({ ctx }): Promise<MemoGameItem[]> => {
      // TODO: Fetch only already discovered kanji
      const kanji = await getKanjiByLevelQuery(ctx.database, "jlpt-n5")

      if (!kanji || kanji.length < MEMO_GAME_KANJI_COUNT) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }

      const kanjiSet = getRandomKanjiSet(kanji, MEMO_GAME_KANJI_COUNT)

      return kanjiSet.map(({ kanji, meanings }) => ({
        kanji,
        meaning: meanings[0]
      }))
    }
  )
})
