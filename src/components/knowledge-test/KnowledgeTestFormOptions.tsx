"use client"

import { Button } from "#/components/ui/button"
import { shuffle } from "#/lib/utils"
import { useCallback, useMemo } from "react"

type KnowledgeTestFormOptionsProps = {
  correctAnswer: string
  incorrectAnswers: string[]
  nextItem: () => void
}

// TODO: Pass possible options for kanji
export default function KnowledgeTestFormOptions({
  correctAnswer,
  incorrectAnswers,
  nextItem
}: KnowledgeTestFormOptionsProps) {
  const chooseAnswerHandler = useCallback(() => {
    // TODO: Evaluate user choice
    nextItem()
  }, [nextItem])

  const testFormOptions = useMemo(
    () => shuffle([correctAnswer, ...incorrectAnswers]),
    [correctAnswer, incorrectAnswers]
  )

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {testFormOptions.map((item) => (
        <Button
          // TODO: Remove as this shows correct answer, only for testing purposes
          style={{ background: item === correctAnswer ? "red" : "black" }}
          key={item}
          onClick={chooseAnswerHandler}
        >
          {item}
        </Button>
      ))}
    </div>
  )
}
