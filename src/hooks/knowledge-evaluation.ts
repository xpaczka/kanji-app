import { trpc } from "#/app/_trpc/client"
import { useCallback, useState } from "react"
import { useNavigation } from "./router"
import { ROUTES } from "#/constants/router"
import { KanjiItemJlptLevel } from "#/database/schema"
import { evaluateKnowledgeTestItemScore } from "#/lib/knowledge-evaluation"

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

export const useKnowledgeEvaluationTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

  const { data: testItems } =
    trpc.knowldegeEvaluation.getKnowledgeEvaluationTestItems.useQuery()

  const evaluateTestAnswerHandler = useCallback(
    (correctAnswer: string, userAnswer: string, level: KanjiItemJlptLevel) => {
      const evaluation = evaluateKnowledgeTestItemScore(
        correctAnswer,
        userAnswer,
        level
      )

      setScore((prev) => prev + evaluation)
    },
    []
  )

  const nextItemHandler = useCallback(() => {
    if (!testItems) return

    // Test is finished and show final score
    if (currentIndex === testItems.length) {
      return
    }

    setCurrentIndex((prev) => prev + 1)
  }, [testItems, currentIndex])

  return {
    testItems,
    currentIndex,
    score,
    nextItem: nextItemHandler,
    evaluateTestAnswer: evaluateTestAnswerHandler
  }
}
