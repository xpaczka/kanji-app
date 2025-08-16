"use client"

import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import { ReactNode } from "react"
import { trpc } from "../_trpc/client"
import FullPageLoader from "#/components/Layout/FullPageLoader"

export default function AppDashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const { isFetching } = trpc.user.getUser.useQuery()

  if (isFetching) {
    return <FullPageLoader />
  }

  return (
    <div className="p-10">
      <BreadcrumbsNavigation />
      {children}
    </div>
  )
}
