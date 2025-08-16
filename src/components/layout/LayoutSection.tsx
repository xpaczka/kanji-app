import { ReactNode } from "react"

type LayoutSectionProps = {
  header: string
  children: ReactNode
}

export default function LayoutSection({
  header,
  children
}: LayoutSectionProps) {
  return (
    <div className="py-10">
      <p className="mb-6 text-xl font-medium text-gray-500">{header}</p>
      {children}
    </div>
  )
}
