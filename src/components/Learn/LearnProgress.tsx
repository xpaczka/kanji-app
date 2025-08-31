import { createServerClient } from "#/app/_trpc/server-client"
import { LEARN_STAGE_COLORS } from "#/constants"
import { LearnStage } from "#/types"
import { groupKanjiProgressByStageName } from "#/utils"
import { LearnStageCard } from "../Card"
import { LayoutSection } from "../Layout"

export default async function LearnProgress() {
  const serverClient = await createServerClient()
  const userKanjiProgress = await serverClient.kanji.getUserKanjiProgress()

  const stages = groupKanjiProgressByStageName(userKanjiProgress)

  return (
    <LayoutSection header="Progress">
      <div className="grid grid-cols-1 grid-rows-5 gap-6 lg:grid-cols-5 lg:grid-rows-1 lg:gap-10">
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
