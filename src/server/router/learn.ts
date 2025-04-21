import { getUserKanjiHistory } from "#/database/queries"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"

export const learnRouter = router({
  getDiscoveredKanji: publicProcedure
    .input(z.string().nullable())
    .query(async ({ input }) =>
      input ? await getUserKanjiHistory(input) : []
    ),
  getRecentKanji: publicProcedure
    .input(z.string().nullable())
    .query(async ({ input }) => {
      if (!input) return []

      const kanjiHistory = await getUserKanjiHistory(input)

      return kanjiHistory.slice(0, 5)
    })
})
