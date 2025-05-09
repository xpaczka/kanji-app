import { UserKanjiHistory } from "#/schemas"
import LearnKanjiItem from "./LearnKanjiItem"

type LearnRecentKanjiProps = {
  recentKanji: UserKanjiHistory[]
}

export default function LearnRecentKanji({
  recentKanji
}: LearnRecentKanjiProps) {
  if (!recentKanji.length) return null

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
