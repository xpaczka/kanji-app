import { ReactNode } from "react"
import EndAppSessionButton from "#/components/buttons/EndAppSessionButton"
import SessionPageHeader from "#/components/Layout/SessionPageHeader"

export default function SessionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="absolute top-0 right-0 left-0 flex items-center justify-between px-10 pt-6">
        <SessionPageHeader />
        <EndAppSessionButton />
      </div>
      {children}
    </div>
  )
}
