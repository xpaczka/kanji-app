"use client"

import Link from "next/link"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material"
import { ReactNode } from "react"
import { motion } from "motion/react"
import { cn } from "#/lib/utils"

type DashboardCardProps = {
  header: string
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string
  }
  description: ReactNode
  href: string
  className?: string
}

export default function DashboardCard({
  header,
  Icon,
  description,
  href,
  className
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 20px 4px rgba(0, 0, 0, 0.2)"
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className={cn(
          "flex flex-col items-center justify-center rounded-md border-2 border-gray-200 px-4 py-8 text-center shadow-2xl lg:aspect-square",
          className
        )}
      >
        <Icon fontSize="large" />
        <p className="my-4 text-4xl font-semibold">{header}</p>
        <p className="text-lg">{description}</p>
      </motion.div>
    </Link>
  )
}
