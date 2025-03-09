import { serverClient } from '#/app/_trpc/server-client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import LearnKanjiItem from './LearnKanjiItem'

export default async function LearnDiscoveredKanji() {
  const kanji = await serverClient.learn.getDiscoveredKanji('user')

  return (
    <Dialog>
      <DialogTrigger className='cursor-pointer underline'>
        All discovered kanji
      </DialogTrigger>
      <DialogContent className='max-h-[600px] overflow-scroll w-full'>
        <DialogHeader>
          <DialogTitle className='text-center mb-4'>
            Discovered kanji
          </DialogTitle>
          <div className='grid grid-cols-3 gap-2'>
            {kanji
              .sort((a, b) => b.proficiency - a.proficiency)
              .map(({ kanji, proficiency, level }) => (
                <LearnKanjiItem
                  key={kanji}
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
