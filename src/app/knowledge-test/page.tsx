"use client"

import KnowledgeTestForm from "#/components/knowledge-test/KnowledgeTestForm"
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
      [KnowledgeTestSteps.TEST]: <KnowledgeTestForm />,
      [KnowledgeTestSteps.SCORE]: "Score"
    }),
    []
  )

  return knowledgeTestComponents[step] || null
}
