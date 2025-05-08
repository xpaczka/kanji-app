import { getKnowledgeEvaluationTestItems } from "#/database/queries"
import { protectedProcedure, router } from "../trpc"

export const knowledgeEvaluationRouter = router({
  getKnowledgeEvaluationTestItems: protectedProcedure.query(
    async () => await getKnowledgeEvaluationTestItems()
  )
})
