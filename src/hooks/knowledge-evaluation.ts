import { trpc } from "#/app/_trpc/client"
import { useCallback, useState } from "react"
import { useNavigation } from "./router"
import { ROUTES } from "#/constants/router"
import {
  evaluateKnowledgeTestItemScore,
  getKnowledgeEvaluationResult
} from "#/lib/knowledge-evaluation"
import { KanjiItemJlptLevel } from "#/types"

export const useKnowledgeEvaluationPrompt = () => {
  const { navigate } = useNavigation()

  const { mutate: updateUserKnowledgeEvaluation } =
    trpc.user.createUserKnowledgeEvaluation.useMutation()

  const skipHandler = useCallback(() => {
    // Set lowest level possible for user who skips
    updateUserKnowledgeEvaluation("jlpt-n5")
    navigate(ROUTES.index)
  }, [updateUserKnowledgeEvaluation, navigate])

  return { skip: skipHandler }
}

export const useKnowledgeEvaluationTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [testFinished, setTestFinished] = useState(false)

  const { data: testItems } =
    trpc.knowldegeEvaluation.getKnowledgeEvaluationTestItems.useQuery()

  const { mutate: setUserKnowledgeEvaluation } =
    trpc.user.createUserKnowledgeEvaluation.useMutation()

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
    if (currentIndex === testItems.length - 1) {
      setTestFinished(true)
      // Dividing the score by 1000 to get it in percentage format
      setUserKnowledgeEvaluation(getKnowledgeEvaluationResult(score / 1000))
      return
    }

    setCurrentIndex((prev) => prev + 1)
  }, [testItems, currentIndex, setUserKnowledgeEvaluation, score])

  return {
    testItems,
    currentIndex,
    score,
    testFinished,
    nextItem: nextItemHandler,
    evaluateTestAnswer: evaluateTestAnswerHandler
  }
}
