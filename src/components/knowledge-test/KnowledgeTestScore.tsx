"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import KnowledgeTestContainer from "./KnowledgeTestContainer"
import { ROUTES } from "#/constants/router"
import { trpc } from "#/app/_trpc/client"

type KnowledgeTestScoreProps = {
  score: number
}

export default function KnowledgeTestScore({ score }: KnowledgeTestScoreProps) {
  const { data: evaluationLevel } =
    trpc.user.getUserKnowledgeEvaluationLevel.useQuery()

  return (
    <KnowledgeTestContainer
      header="Your current level"
      footer={
        <Button asChild>
          <Link href={ROUTES.index}>Go to dashboard</Link>
        </Button>
      }
    >
      <div className="flex flex-col items-center py-4">
        {evaluationLevel && (
          <div className="mb-4 rounded-sm bg-[#EEE] px-4 py-3 text-4xl font-bold">
            {evaluationLevel.toUpperCase()}
          </div>
        )}
        <p className="text-lg font-bold">Test score: {score / 100}%</p>
      </div>
    </KnowledgeTestContainer>
  )
}
