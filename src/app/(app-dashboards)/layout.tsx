import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { getSession } from "#/lib/session"
import { ReactNode } from "react"
import { createServerClient } from "../_trpc/server-client"

export default async function AppRoutesLayout({
  children
}: {
  children: ReactNode
}) {
  const session = await getSession()
  const serverClient = await createServerClient()

  const user =
    session && "userId" in session
      ? await serverClient.user.getUser(session.userId as string)
      : null

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
