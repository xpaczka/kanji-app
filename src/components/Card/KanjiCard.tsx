"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ROUTES } from "#/constants/router"
import { Database } from "#/types"

type KanjiCardProps = Pick<
  Database["public"]["Tables"]["kanji"]["Row"],
  "kanji" | "level"
>

export default function KanjiCard({ kanji, level }: KanjiCardProps) {
  return (
    <Link key={kanji} href={`${ROUTES.kanji}/${kanji}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="flex aspect-square flex-col items-center justify-center rounded-md border-2 border-gray-200 bg-white p-8 shadow-md"
      >
        <div className="mb-4 text-5xl font-bold">{kanji}</div>
        <p className="text-sm text-gray-400">{level.toUpperCase()}</p>
      </motion.div>
    </Link>
  )
}
