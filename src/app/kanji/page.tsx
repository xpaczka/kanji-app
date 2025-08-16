import { LayoutSection } from "#/components/Layout"
import { createServerClient } from "../_trpc/server-client"
import KanjiCard from "#/components/Card/KanjiCard"

export default async function KanjiPage() {
  const serverClient = await createServerClient()
  const kanji = await serverClient.kanji.getAllKanji()

  if (!kanji.length) return null

  return (
    <LayoutSection header="Kanji">
      <div className="mb-10 grid grid-cols-5 grid-rows-4 gap-10">
        {kanji.map(({ kanji, level }) => (
          <KanjiCard key={kanji} kanji={kanji} level={level} />
        ))}
      </div>
      <div className="flex w-full justify-center">
        <button className="cursor-pointer rounded-md border-2 border-gray-200 px-6 py-2 font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-white">
          Load more
        </button>
      </div>
    </LayoutSection>
  )
}
