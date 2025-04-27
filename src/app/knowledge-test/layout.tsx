"use client"

import { ReactNode, useEffect } from "react"
import { useNavigation } from "#/hooks"
import { ROUTES } from "#/constants/router"
import { trpc } from "#/app/_trpc/client"

// TODO: Add loading state
export default function AppRoutesLayout({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation()

  const { data: knowledgeEvaluationLevel, isFetched } =
    trpc.user.getUserKnowledgeEvaluationLevel.useQuery()

  useEffect(() => {
    if (isFetched && knowledgeEvaluationLevel) {
      navigate(ROUTES.mainDashboard)
    }
  }, [knowledgeEvaluationLevel, isFetched, navigate])

  return (
    <div className="grid h-[100vh] place-items-center p-12">{children}</div>
  )
}
