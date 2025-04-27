"use client"

import KnowledgeTestPrompt from "#/components/knowledge-test/KnowledgeTestPrompt"
import { KnowledgeTestSteps } from "#/schemas"
import { useState } from "react"

export default function KnowledgeTest() {
  const [, setStep] = useState<KnowledgeTestSteps>(KnowledgeTestSteps.PROMPT)

  return <KnowledgeTestPrompt setStep={setStep} />
}
