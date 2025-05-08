"use client"

import KnowledgeTestContainer from "./KnowledgeTestContainer"
import KnowledgeTestFormOptions from "./KnowledgeTestFormOptions"
import { useKnowledgeEvaluationTest } from "#/hooks"
import { shuffle } from "#/lib/utils"
import { KnowledgeTestSteps } from "#/schemas"
import { Dispatch, SetStateAction, useEffect } from "react"

type KnowledgeTestFormProps = {
  setStep: Dispatch<SetStateAction<KnowledgeTestSteps>>
  setScore: Dispatch<SetStateAction<number>>
}

const getAllIncorrectAnwsers = (readings: string[], correctAnswer: string) => {
  const incorrectAnswers = readings.filter(
    (reading) => reading !== correctAnswer
  )

  return shuffle(incorrectAnswers).slice(0, 3)
}

// TODO: Add loading state
export default function KnowledgeTestForm({
  setStep,
  setScore
}: KnowledgeTestFormProps) {
  const {
    testItems,
    currentIndex,
    score,
    testFinished,
    nextItem,
    evaluateTestAnswer
  } = useKnowledgeEvaluationTest()

  useEffect(() => {
    if (!testFinished) return

    // When test is finished redirect user to score view
    setScore(score)
    setStep(KnowledgeTestSteps.SCORE)
  }, [testFinished, setStep, setScore, score])

  if (!testItems) return null

  return (
    <KnowledgeTestContainer
      header={
        <div className="flex w-full justify-center">
          <div className="rounded-sm bg-[#EEE] px-2 py-1 text-sm font-bold">
            {testItems[currentIndex].level.toUpperCase()}
          </div>
        </div>
      }
      footer={
        <KnowledgeTestFormOptions
          evaluateTestAnswer={evaluateTestAnswer}
          nextItem={nextItem}
          level={testItems[currentIndex].level}
          correctAnswer={testItems[currentIndex].reading}
          incorrectAnswers={getAllIncorrectAnwsers(
            testItems.map((item) => item.reading),
            testItems[currentIndex].reading
          )}
        />
      }
    >
      <div className="py-12 text-6xl font-bold">
        {testItems[currentIndex].kanji}
      </div>
    </KnowledgeTestContainer>
  )
}
