"use client"

import { Button } from "#/components/ui/button"
import { useKnowledgeEvaluationPrompt } from "#/hooks"
import { Dispatch, SetStateAction, useCallback } from "react"
import { KnowledgeTestSteps } from "#/schemas"
import KnowledgeTestContainer from "./KnowledgeTestContainer"

type KnowledgeTestPromptProps = {
  setStep: Dispatch<SetStateAction<KnowledgeTestSteps>>
}

export default function KnowledgeTestPrompt({
  setStep
}: KnowledgeTestPromptProps) {
  const startKnowledgeEvaluation = useCallback(() => {
    setStep(KnowledgeTestSteps.TEST)
  }, [setStep])

  const { skip } = useKnowledgeEvaluationPrompt()

  return (
    <KnowledgeTestContainer
      header="Check your knowledge"
      footer={
        <>
          <Button onClick={startKnowledgeEvaluation}>Check knowledge</Button>
          <Button onClick={skip} variant="secondary">
            Skip
          </Button>
        </>
      }
    >
      Do you want to test your knowledge <br />
      or skip and start from the beginning?
    </KnowledgeTestContainer>
  )
}
