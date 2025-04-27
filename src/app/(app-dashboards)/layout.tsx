import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { ReactNode } from "react"
import { createServerClient } from "../_trpc/server-client"
import KnowledgeTest from "#/components/knowledge-test/KnowledgeTest"

export default async function AppRoutesLayout({
  children
}: {
  children: ReactNode
}) {
  const serverClient = await createServerClient()

  const knowledgeEvaluationLevel =
    await serverClient.user.getUserKnowledgeEvaluationLevel()

  if (!knowledgeEvaluationLevel) return <KnowledgeTest />

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
