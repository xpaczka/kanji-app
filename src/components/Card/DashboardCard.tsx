import Link from "next/link"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material"
import { ReactNode } from "react"
import { cn } from "#/lib/utils"
import MotionCard from "./MotionCard"

type DashboardCardProps = {
  header: string
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string
  }
  description: ReactNode
  href: string
  className?: string
  disabled?: boolean
}

export default function DashboardCard({
  header,
  Icon,
  description,
  href,
  className,
  disabled = false
}: DashboardCardProps) {
  const content = (
    <MotionCard
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden p-8 text-center shadow-2xl lg:py-20",
        className
      )}
    >
      <Icon />
      <p className="mt-2 text-3xl font-semibold">{header}</p>
      <div className="my-2 h-1 w-1/2 max-w-[140px] rounded-lg bg-white" />
      <p className="text-lg">{description}</p>
      {disabled && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
          <p className="mb-2 text-3xl font-bold">Coming soon</p>
          <div className="h-1 w-1/2 max-w-[140px] rounded-lg bg-white" />
        </div>
      )}
    </MotionCard>
  )

  return disabled ? content : <Link href={href}>{content}</Link>
}
