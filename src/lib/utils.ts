import { DatabaseKanji } from '#/database/schema'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const shuffle = <T>(items: T[]): T[] => {
  const newItems = [...items]

  for (let i = newItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newItems[i], newItems[j]] = [newItems[j], newItems[i]]
  }

  return newItems
}

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
