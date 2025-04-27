"use client"

import KnowledgeTestPrompt from "#/components/knowledge-test/KnowledgeTestPrompt"
import { KnowledgeTestSteps } from "#/schemas"
import { useMemo, useState } from "react"

export default function KnowledgeTest() {
  const [step, setStep] = useState<KnowledgeTestSteps>(
    KnowledgeTestSteps.PROMPT
  )

  const knowledgeTestComponents = useMemo(
    () => ({
      [KnowledgeTestSteps.PROMPT]: <KnowledgeTestPrompt setStep={setStep} />,
      [KnowledgeTestSteps.TEST]: "Test",
      [KnowledgeTestSteps.SCORE]: "Score"
    }),
    []
  )

  return knowledgeTestComponents[step] || null
}
