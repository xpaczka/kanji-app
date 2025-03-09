import { KanjiItem } from '#/schemas/learn'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

const RECENT_KANJIS: KanjiItem[] = [
  { kanji: '私', level: 'N5', proficiency: 33 },
  { kanji: '水', level: 'N4', proficiency: 50 },
  { kanji: '足', level: 'N5', proficiency: 77 },
  { kanji: '駅', level: 'N3', proficiency: 10 },
  { kanji: '空', level: 'N5', proficiency: 5 },
]

export const learnRouter = router({
  getRecentKanjis: publicProcedure
    .input(z.string())
    .query(async () => RECENT_KANJIS),
})
