import { ReactNode } from "react"

export default function ModuleLayout({ children }: { children: ReactNode }) {
  return (
    <div id="h-[calc(100% - 219px)] lg:h-[calc(100% - 251px)]">{children}</div>
  )
}
