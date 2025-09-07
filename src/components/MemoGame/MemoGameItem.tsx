"use client"

import { motion } from "motion/react"

type MemoGameItemProps = {
  content: string
  isRevealed: boolean
  onClick: () => void
}

export default function MemoGameItem({
  content,
  isRevealed,
  onClick
}: MemoGameItemProps) {
  return (
    <motion.div
      className="relative h-24 w-24 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={onClick}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-gray-400 bg-white"
          style={{ backfaceVisibility: "hidden" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-orange-400 bg-orange-400 font-medium text-white"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {content}
        </div>
      </motion.div>
    </motion.div>
  )
}
