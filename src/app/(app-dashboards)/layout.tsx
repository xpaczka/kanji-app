"use client"

import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { ReactNode } from "react"

export default function KnowledgeTestLayout({
  children
}: {
  children: ReactNode
}) {
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
