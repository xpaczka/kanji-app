import { createServerClient } from "#/app/_trpc/server-client"
import { LEARN_STAGE_COLORS } from "#/constants"
import { LearnStage } from "#/types"
import { groupKanjiProgressByStageName } from "#/utils"
import { LearnStageCard } from "../Card"
import LayoutSection from "../LayoutSection"

export default async function LearnProgress() {
  const serverClient = await createServerClient()
  const userKanjiProgress = await serverClient.kanji.getUserKanjiProgress()

  const stages = groupKanjiProgressByStageName(userKanjiProgress)

  return (
    <LayoutSection header="Progress">
      <div className="flex flex-col gap-3">
        {Object.entries(stages).map(([stageName, kanjiCount]) => (
          <LearnStageCard
            key={stageName}
            stage={stageName as LearnStage}
            kanjiCount={kanjiCount}
            color={LEARN_STAGE_COLORS[stageName as LearnStage]}
          />
        ))}
      </div>
    </LayoutSection>
  )
}
