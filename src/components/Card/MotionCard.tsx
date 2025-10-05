"use client"

import { cn } from "#/utils"
import { HTMLMotionProps, motion } from "motion/react"
import { ReactNode } from "react"

type MotionCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode
  disabled?: boolean
}

export default function MotionCard({
  children,
  className,
  disabled = false,
  ...props
}: MotionCardProps) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.03,
              boxShadow: "0 0 20px 4px rgba(0, 0, 0, 0.2)"
            }
      }
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className={cn("rounded-md border-2 border-gray-200 bg-white", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
