import { getUserKanjiHistory } from "#/database/queries"
import { KanjiProficiency } from "#/schemas/kanji"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"

const RECENT_KANJI: KanjiProficiency[] = [
  { kanji: "私", level: "jlpt-n5", proficiency: 33 },
  { kanji: "水", level: "jlpt-n4", proficiency: 50 },
  { kanji: "足", level: "jlpt-n5", proficiency: 77 },
  { kanji: "駅", level: "jlpt-n3", proficiency: 10 },
  { kanji: "空", level: "jlpt-n5", proficiency: 5 }
]

export const learnRouter = router({
  getDiscoveredKanji: publicProcedure
    .input(z.string().nullable())
    .query(async ({ input }) => {
      if (!input) return []

      return await getUserKanjiHistory(input)
    }),
  getRecentKanji: publicProcedure
    .input(z.string())
    .query(async () => RECENT_KANJI)
})
