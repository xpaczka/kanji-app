import { createServerClient } from "#/app/_trpc/server-client"
import LearnKanjiItem from "./LearnKanjiItem"

export default async function LearnRecentKanji() {
  const serverClient = await createServerClient()
  const recentKanji = await serverClient.learn.getRecentKanji()

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
