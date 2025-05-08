"use client"

import KnowledgeTestForm from "#/components/knowledge-test/KnowledgeTestForm"
import KnowledgeTestPrompt from "#/components/knowledge-test/KnowledgeTestPrompt"
import KnowledgeTestScore from "#/components/knowledge-test/KnowledgeTestScore"
import { KnowledgeTestSteps } from "#/schemas"
import { useMemo, useState } from "react"

export default function KnowledgeTest() {
  const [step, setStep] = useState<KnowledgeTestSteps>(
    KnowledgeTestSteps.PROMPT
  )

  const [score, setScore] = useState(0)

  const knowledgeTestComponents = useMemo(
    () => ({
      [KnowledgeTestSteps.PROMPT]: <KnowledgeTestPrompt setStep={setStep} />,
      [KnowledgeTestSteps.TEST]: (
        <KnowledgeTestForm setStep={setStep} setScore={setScore} />
      ),
      [KnowledgeTestSteps.SCORE]: <KnowledgeTestScore score={score} />
    }),
    [score]
  )

  return knowledgeTestComponents[step] || null
}
