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
import LearnKanjiItem from "./LearnKanjiItem"
import { KanjiItemJlptLevel } from "#/database/schema"

export default function LearnDiscoveredKanji() {
  const userId = useUserStore((state) => state.userId)
  const { data: kanji } = trpc.learn.getDiscoveredKanji.useQuery(userId)

  if (!kanji || !kanji.length) return null

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
          <div className="grid grid-cols-3 gap-2">
            {kanji.map(({ kanji, level }, index) => (
              <LearnKanjiItem
                key={`${kanji}-${index}`}
                kanji={kanji as string}
                // TODO: Calculate proficiency
                proficiency={70}
                level={level as KanjiItemJlptLevel}
              />
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
