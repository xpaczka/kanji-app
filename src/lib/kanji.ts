import { DatabaseKanji } from "#/database/schema"
import { shuffle } from "./utils"

export const getRandomKanjiSet = (
  kanjiSet: DatabaseKanji[],
  count: number
): DatabaseKanji[] => {
  const uniqueKanjiSet = Array.from(
    new Map(kanjiSet.map((item) => [item.kanji, item])).values()
  )

  if (count >= uniqueKanjiSet.length) return uniqueKanjiSet

  const newKanjiSet = shuffle(uniqueKanjiSet)

  return newKanjiSet.slice(newKanjiSet.length - count)
}
