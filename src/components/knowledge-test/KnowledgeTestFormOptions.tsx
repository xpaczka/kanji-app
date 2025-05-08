"use client"

import { Button } from "#/components/ui/button"
import { KanjiItemJlptLevel } from "#/database/schema"
import { shuffle } from "#/lib/utils"
import { useCallback, useMemo } from "react"

type KnowledgeTestFormOptionsProps = {
  correctAnswer: string
  incorrectAnswers: string[]
  level: KanjiItemJlptLevel
  nextItem: () => void
  evaluateTestAnswer: (
    correctAnswer: string,
    userAnswer: string,
    level: KanjiItemJlptLevel
  ) => void
}

export default function KnowledgeTestFormOptions({
  correctAnswer,
  incorrectAnswers,
  nextItem,
  level,
  evaluateTestAnswer
}: KnowledgeTestFormOptionsProps) {
  const chooseAnswerHandler = useCallback(
    (answer: string) => {
      evaluateTestAnswer(correctAnswer, answer, level)
      nextItem()
    },
    [nextItem, level, correctAnswer, evaluateTestAnswer]
  )

  const testFormOptions = useMemo(
    () => shuffle([correctAnswer, ...incorrectAnswers]),
    [correctAnswer, incorrectAnswers]
  )

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {testFormOptions.map((item) => (
        <Button key={item} onClick={() => chooseAnswerHandler(item)}>
          {item}
        </Button>
      ))}
    </div>
  )
}
