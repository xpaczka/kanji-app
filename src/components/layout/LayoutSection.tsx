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
    <div className="py-6 lg:py-10">
      <p className="mb-6 text-xl font-medium text-gray-600">{header}</p>
      {children}
    </div>
  )
}
