import Link from "next/link"
import { ROUTES } from "#/constants/router"
import { Database } from "#/types"
import MotionCard from "./MotionCard"

type KanjiCardProps = Pick<
  Database["public"]["Tables"]["kanji"]["Row"],
  "kanji" | "level"
>

export default function KanjiCard({ kanji, level }: KanjiCardProps) {
  return (
    <Link key={kanji} href={`${ROUTES.kanji}/${kanji}`}>
      <MotionCard className="flex flex-col items-center justify-center p-8 sm:aspect-square">
        <div className="mb-4 text-5xl font-bold">{kanji}</div>
        <p className="text-sm text-gray-400">{level.toUpperCase()}</p>
      </MotionCard>
    </Link>
  )
}
