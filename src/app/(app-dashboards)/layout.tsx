"use client"

import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { ReactNode } from "react"
import { trpc } from "../_trpc/client"
import FullPageLoader from "#/components/layout/FullPageLoader"

export default function AppDashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const { data: user, isFetching } = trpc.user.getUser.useQuery()

  if (isFetching) {
    return <FullPageLoader />
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
