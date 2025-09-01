import { LEARN_STAGE_COLORS } from "#/constants"
import { LearnStage } from "#/types"

type KanjiStageLabelProps = {
  stage: LearnStage
}

export default function KanjiStageLabel({ stage }: KanjiStageLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`${LEARN_STAGE_COLORS[stage]} h-5 w-5 rounded-full`} />
      <div className="text-sm text-gray-400">{stage}</div>
    </div>
  )
}
