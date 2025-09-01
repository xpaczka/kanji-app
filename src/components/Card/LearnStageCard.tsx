import { LearnStage } from "#/types"

type LearnStageCardProps = {
  stage: LearnStage
  color: string
  kanjiCount: number
}

export default function LearnStageCard({
  stage,
  color,
  kanjiCount
}: LearnStageCardProps) {
  return (
    <div className="flex items-center rounded-md border-2 border-gray-200 bg-white p-8 text-center shadow-md lg:block">
      <p className="text-lg font-medium">{stage}</p>
      <div
        className={`mt:0 mx-8 h-full w-2 rounded-full lg:mx-0 lg:mt-4 lg:h-2 lg:w-full ${color}`}
      />
      <div className="flex-1 lg:mt-4">
        <p className="text-gray-400">Kanji</p>
        <p className="text-lg font-bold">{kanjiCount}</p>
      </div>
    </div>
  )
}
