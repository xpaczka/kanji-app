"use client"

import { ReactNode, useEffect, useState } from "react"
import { useNavigation } from "#/hooks"
import { ROUTES } from "#/constants/router"
import { trpc } from "#/app/_trpc/client"

// TODO: Add loading state
export default function AppRoutesLayout({ children }: { children: ReactNode }) {
  // Prevents immediate redirect after knowledge evaluation is completed
  const [checkedEvaluationExistence, setCheckedEvaluationExistence] =
    useState(false)

  const { navigate } = useNavigation()

  const { data: knowledgeEvaluationLevel, isFetched } =
    trpc.user.getUserKnowledgeEvaluationLevel.useQuery()

  useEffect(() => {
    if (isFetched) {
      if (!checkedEvaluationExistence && knowledgeEvaluationLevel) {
        navigate(ROUTES.mainDashboard)
      } else {
        setCheckedEvaluationExistence(true)
      }
    }
  }, [
    knowledgeEvaluationLevel,
    isFetched,
    navigate,
    checkedEvaluationExistence
  ])

  return (
    <div className="grid h-[100vh] place-items-center p-12">{children}</div>
  )
}
