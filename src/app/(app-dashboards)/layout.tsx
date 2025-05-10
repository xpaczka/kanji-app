"use client"

import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { ReactNode } from "react"
import { trpc } from "../_trpc/client"
import { Spinner } from "#/components/ui/spinner"

export default function AppDashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const { data: user, isFetching } = trpc.user.getUser.useQuery()

  if (isFetching) {
    return <Spinner size="large" />
  }

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
