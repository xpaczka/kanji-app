"use client"

import Link from "next/link"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material"
import { ReactNode, useState } from "react"
import { motion } from "motion/react"

type DashboardCardProps = {
  header: string
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string
  }
  description: ReactNode
  href: string
}

export default function DashboardCard({
  header,
  Icon,
  description,
  href
}: DashboardCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center justify-center rounded-md border-2 border-gray-200 px-4 py-8 text-center shadow-md lg:aspect-square">
          <Icon />
          <p className="mt-2 mb-4 text-2xl font-semibold">{header}</p>
          <p>{description}</p>
        </div>
      </motion.div>
    </Link>
  )
}
