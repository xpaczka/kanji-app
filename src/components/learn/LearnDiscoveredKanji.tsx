import { serverClient } from "#/app/_trpc/server-client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "#/components/ui/dialog"
import LearnKanjiItem from "./LearnKanjiItem"

export default async function LearnDiscoveredKanji() {
  const kanji = await serverClient.learn.getDiscoveredKanji("user")

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
            {kanji
              .sort((a, b) => b.proficiency - a.proficiency)
              .map(({ kanji, proficiency, level }, index) => (
                <LearnKanjiItem
                  key={`${kanji}-${index}`}
                  kanji={kanji}
                  proficiency={proficiency}
                  level={level}
                />
              ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
