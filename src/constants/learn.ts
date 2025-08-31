import { LearnStage } from "#/types"

export const LEARN_STAGE_COLORS: Record<LearnStage, string> = {
  [LearnStage.Stage1]: "bg-red-400",
  [LearnStage.Stage2]: "bg-orange-400",
  [LearnStage.Stage3]: "bg-yellow-400",
  [LearnStage.Stage4]: "bg-green-400",
  [LearnStage.Stage5]: "bg-purple-400"
}
