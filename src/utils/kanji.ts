import { Database, LearnStage } from "#/types"

const STAGE_GROUPING: Record<number, LearnStage> = {
  1: LearnStage.Stage1,
  2: LearnStage.Stage1,
  3: LearnStage.Stage1,
  4: LearnStage.Stage2,
  5: LearnStage.Stage2,
  6: LearnStage.Stage3,
  7: LearnStage.Stage3,
  8: LearnStage.Stage4,
  9: LearnStage.Stage4,
  10: LearnStage.Stage5
}

export const groupKanjiProgressByStageName = (
  items: Database["public"]["Tables"]["user_kanji"]["Row"][]
): Record<LearnStage, number> => {
  const stages: Record<LearnStage, number> = {
    [LearnStage.Stage1]: 0,
    [LearnStage.Stage2]: 0,
    [LearnStage.Stage3]: 0,
    [LearnStage.Stage4]: 0,
    [LearnStage.Stage5]: 0
  }

  for (const { stage } of items) {
    const stageName = STAGE_GROUPING[stage]
    stages[stageName] += 1
  }

  return stages
}
