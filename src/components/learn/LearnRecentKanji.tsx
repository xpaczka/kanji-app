"use client"

import { trpc } from "#/app/_trpc/client"
import { useUserStore } from "#/store/user"
import LearnKanjiItem from "./LearnKanjiItem"

export default function LearnRecentKanji() {
  const userId = useUserStore((state) => state.userId)
  const { data: recentKanji } = trpc.learn.getRecentKanji.useQuery(userId)

  if (!recentKanji || !recentKanji.length) return null

  return (
    <div className="flex w-full gap-6">
      {recentKanji.map(({ kanji, level }, index) => (
        <LearnKanjiItem
          key={`${kanji}-${index}`}
          kanji={kanji}
          // TODO: Calculate proficiency
          proficiency={70}
          level={level}
        />
      ))}
    </div>
  )
}
