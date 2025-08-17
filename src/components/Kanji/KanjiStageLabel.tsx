import { LearnStage, LearnStageColor } from "#/types"

type KanjiStageLabelProps = {
  stage: LearnStage
  color: LearnStageColor
}

export default function KanjiStageLabel({
  stage,
  color
}: KanjiStageLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`${color} h-5 w-5 rounded-full`} />
      <div className="text-sm text-gray-400">{stage}</div>
    </div>
  )
}
