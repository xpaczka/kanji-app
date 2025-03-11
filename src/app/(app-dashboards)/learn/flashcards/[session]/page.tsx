import { serverClient } from '#/app/_trpc/server-client'
import FlashcardsSession from '#/components/flashcards/FlashcardsSession'

export default async function FlashcardsSessionPage() {
  const kanjiSet = await serverClient.flashcards.getFlashcardsSessionKanji(
    'jlpt-n5'
  )

  return (
    <div className='mx-auto max-w-[420px] w-full'>
      <FlashcardsSession kanjiSet={kanjiSet} />
    </div>
  )
}
