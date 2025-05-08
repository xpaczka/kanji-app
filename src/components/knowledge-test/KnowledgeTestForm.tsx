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
  const { testItems, currentIndex, nextItem } = useKnowledgeEvaluationTest()

  if (!testItems) return null

  return (
    <KnowledgeTestContainer
      header={testItems[currentIndex].level.toUpperCase()}
      footer={
        <KnowledgeTestFormOptions
          nextItem={nextItem}
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
