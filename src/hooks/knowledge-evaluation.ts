import { trpc } from "#/app/_trpc/client"
import { useCallback } from "react"
import { useNavigation } from "./router"
import { ROUTES } from "#/constants/router"

export const useKnowledgeEvaluationPrompt = () => {
  const { navigate } = useNavigation()

  const { mutate: updateUserKnowledgeEvaluation } =
    trpc.user.createUserKnowledgeEvaluation.useMutation()

  const skipHandler = useCallback(() => {
    // Set lowest level possible for user who skips
    updateUserKnowledgeEvaluation("jlpt-n5")
    navigate(ROUTES.mainDashboard)
  }, [updateUserKnowledgeEvaluation, navigate])

  return { skip: skipHandler }
}
