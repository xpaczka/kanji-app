import { trpc } from "#/app/_trpc/client"
import { useCallback } from "react"

export const useKnowledgeEvaluationPrompt = () => {
  const { mutate: updateUserKnowledgeEvaluation } =
    trpc.user.createUserKnowledgeEvaluation.useMutation()

  const checkKnowledgeHandler = useCallback(() => {}, [])

  const skipHandler = useCallback(() => {
    // Set lowest level possible for user who skips
    updateUserKnowledgeEvaluation("jlpt-n5")
  }, [updateUserKnowledgeEvaluation])

  return { checkKnowledge: checkKnowledgeHandler, skip: skipHandler }
}
