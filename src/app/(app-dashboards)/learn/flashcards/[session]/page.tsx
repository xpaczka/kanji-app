import { serverClient } from '#/app/_trpc/server-client'

export default async function FlashcardsSessionPage() {
  const kanjiSet = await serverClient.flashcards.getFlashcardsSessionKanji(
    'jlpt-n5'
  )

  return kanjiSet.map((kanji) => <div key={kanji.kanji}>{kanji.kanji}</div>)
}
