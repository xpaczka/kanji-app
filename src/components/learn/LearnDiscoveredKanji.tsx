"use client"

import { trpc } from "#/app/_trpc/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "#/components/ui/dialog"
import { useUserStore } from "#/store/user"
import { Progress } from "../ui/progress"
import LearnKanjiItem from "./LearnKanjiItem"

export default function LearnDiscoveredKanji() {
  const userId = useUserStore((state) => state.userId)

  const { data: kanji } = trpc.learn.getDiscoveredKanji.useQuery(userId)

  const { data: discoveredKanjiCount } =
    trpc.learn.getDiscoveredKanjiCount.useQuery(userId)

  if (!kanji || !kanji.length || !discoveredKanjiCount) return null

  const { discoveredKanji, allKanji } = discoveredKanjiCount

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer underline">
        All discovered kanji
      </DialogTrigger>
      <DialogContent className="max-h-[600px] w-full overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            Discovered kanji
          </DialogTitle>
        </DialogHeader>
        <div className="mb-2 flex flex-col items-center gap-4">
          <Progress value={discoveredKanji / allKanji} />
          <p className="text-xs">
            {discoveredKanji} / {allKanji}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {kanji.map(({ kanji, level }, index) => (
            <LearnKanjiItem
              key={`${kanji}-${index}`}
              kanji={kanji}
              // TODO: Calculate proficiency
              proficiency={70}
              level={level}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
