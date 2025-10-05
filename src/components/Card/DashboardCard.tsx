import Link from "next/link"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material"
import { ReactNode } from "react"
import { cn } from "#/utils"
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
  indicator?: number
}

export default function DashboardCard({
  header,
  Icon,
  description,
  href,
  className,
  indicator,
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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70" />
      )}
      {!disabled && indicator && (
        <div className="absolute top-4 right-0 flex w-full justify-end pr-4">
          <div className="rounded-lg border-2 border-gray-600 bg-white px-4 text-lg font-medium text-black">
            {indicator}
          </div>
        </div>
      )}
    </MotionCard>
  )

  return disabled ? content : <Link href={href}>{content}</Link>
}
