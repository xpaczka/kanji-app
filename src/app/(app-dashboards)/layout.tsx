import TopNavigation from '#/components/navigation/top-navigation'
import { ReactNode } from 'react'

export default function AppRoutesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNavigation />
      {children}
    </>
  )
}
