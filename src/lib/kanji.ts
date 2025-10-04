import { Database } from "#/types"
import { shuffle } from "./utils"

export const getRandomKanjiSet = (
  kanjiSet: Database["public"]["Functions"]["get_user_kanji"]["Returns"],
  count: number
): Database["public"]["Functions"]["get_user_kanji"]["Returns"] => {
  const uniqueKanjiSet = Array.from(
    new Map(kanjiSet.map((item) => [item.kanji, item])).values()
  )

  if (count >= uniqueKanjiSet.length) return uniqueKanjiSet

  const newKanjiSet = shuffle(uniqueKanjiSet)

  return newKanjiSet.slice(newKanjiSet.length - count)
}
