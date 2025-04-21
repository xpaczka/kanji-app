import BreadcrumbsNavigation from "#/components/navigation/BreadcrumbsNavigation"
import TopNavigation from "#/components/navigation/TopNavigation"
import { ReactNode } from "react"

export default async function AppRoutesLayout({
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
