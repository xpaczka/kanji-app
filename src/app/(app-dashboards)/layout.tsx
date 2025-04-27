"use client"

import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { ReactNode, useEffect } from "react"
import { trpc } from "../_trpc/client"
import { useNavigation } from "#/hooks"
import { ROUTES } from "#/constants/router"

// TODO: Add loading state
export default function KnowledgeTestLayout({
  children
}: {
  children: ReactNode
}) {
  const { navigate } = useNavigation()

  const { data: knowledgeEvaluationLevel, isFetched } =
    trpc.user.getUserKnowledgeEvaluationLevel.useQuery()

  useEffect(() => {
    if (isFetched && !knowledgeEvaluationLevel) {
      navigate(ROUTES.knowledgeTest)
    }
  }, [knowledgeEvaluationLevel, isFetched, navigate])

  return (
    <>
      <TopNavigation />
      <div className="p-10">
        <BreadcrumbsNavigation />
        {children}
      </div>
    </>
  )
}
