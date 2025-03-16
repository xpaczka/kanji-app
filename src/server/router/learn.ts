import { KanjiProficiency } from '#/schemas/learn'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

const RECENT_KANJI: KanjiProficiency[] = [
  { kanji: '私', level: 'N5', proficiency: 33 },
  { kanji: '水', level: 'N4', proficiency: 50 },
  { kanji: '足', level: 'N5', proficiency: 77 },
  { kanji: '駅', level: 'N3', proficiency: 10 },
  { kanji: '空', level: 'N5', proficiency: 5 },
]

const ALL_DISCOVERED_KANJI: KanjiProficiency[] = [
  { kanji: '私', level: 'N5', proficiency: 33 },
  { kanji: '水', level: 'N4', proficiency: 50 },
  { kanji: '足', level: 'N5', proficiency: 77 },
  { kanji: '駅', level: 'N3', proficiency: 10 },
  { kanji: '空', level: 'N5', proficiency: 5 },
  { kanji: '火', level: 'N5', proficiency: 48 },
  { kanji: '土', level: 'N2', proficiency: 17 },
]

export const learnRouter = router({
  getDiscoveredKanji: publicProcedure
    .input(z.string())
    .query(async () => ALL_DISCOVERED_KANJI),
  getRecentKanji: publicProcedure
    .input(z.string())
    .query(async () => RECENT_KANJI),
})
