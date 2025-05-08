"use client"

import KnowledgeTestContainer from "./KnowledgeTestContainer"
import KnowledgeTestFormOptions from "./KnowledgeTestFormOptions"
import { useKnowledgeEvaluationTest } from "#/hooks"
import { shuffle } from "#/lib/utils"

const getAllIncorrectAnwsers = (readings: string[], correctAnswer: string) => {
  const incorrectAnswers = readings.filter(
    (reading) => reading !== correctAnswer
  )

  return shuffle(incorrectAnswers).slice(0, 3)
}

// TODO: Add loading state
export default function KnowledgeTestForm() {
  const { testItems, currentIndex, nextItem, evaluateTestAnswer } =
    useKnowledgeEvaluationTest()

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
