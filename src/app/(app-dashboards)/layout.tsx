import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { ReactNode } from "react"
import { createServerClient } from "../_trpc/server-client"

export default async function AppRoutesLayout({
  children
}: {
  children: ReactNode
}) {
  const serverClient = await createServerClient()
  const user = await serverClient.user.getUser()

  return (
    <>
      <TopNavigation user={user} />
      <div className="p-10">
        <BreadcrumbsNavigation />
        {children}
      </div>
    </>
  )
}
