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
    <div className="flex items-center rounded-md border-2 border-gray-200 bg-white px-8 py-6 text-center shadow-md">
      <p className="text-lg font-medium">{stage}</p>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className={`${color} h-8 w-2 rounded-full`} />
        <p className="w-12 text-right text-lg font-bold">{kanjiCount}</p>
      </div>
    </div>
  )
}
