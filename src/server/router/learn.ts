import { KanjiProficiency } from "#/schemas/learn"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"

const RECENT_KANJI: KanjiProficiency[] = [
  { kanji: "私", level: "jlpt-n5", proficiency: 33 },
  { kanji: "水", level: "jlpt-n4", proficiency: 50 },
  { kanji: "足", level: "jlpt-n5", proficiency: 77 },
  { kanji: "駅", level: "jlpt-n3", proficiency: 10 },
  { kanji: "空", level: "jlpt-n5", proficiency: 5 },
]

const ALL_DISCOVERED_KANJI: KanjiProficiency[] = [
  { kanji: "私", level: "jlpt-n5", proficiency: 33 },
  { kanji: "水", level: "jlpt-n4", proficiency: 50 },
  { kanji: "足", level: "jlpt-n5", proficiency: 77 },
  { kanji: "駅", level: "jlpt-n3", proficiency: 10 },
  { kanji: "空", level: "jlpt-n5", proficiency: 5 },
  { kanji: "火", level: "jlpt-n5", proficiency: 48 },
  { kanji: "土", level: "jlpt-n2", proficiency: 17 },
]

export const learnRouter = router({
  getDiscoveredKanji: publicProcedure
    .input(z.string())
    .query(async () => ALL_DISCOVERED_KANJI),
  getRecentKanji: publicProcedure
    .input(z.string())
    .query(async () => RECENT_KANJI),
})
