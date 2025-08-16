import { LayoutSection } from "#/components/Layout"
import { createServerClient } from "../_trpc/server-client"
import KanjiCard from "#/components/Card/KanjiCard"

export default async function KanjiPage() {
  const serverClient = await createServerClient()
  const kanji = await serverClient.kanji.getAllKanji()

  if (!kanji.length) return null

  return (
    <LayoutSection header="Kanji">
      <div className="grid grid-cols-5 grid-rows-4 gap-10">
        {kanji.map(({ kanji, level }) => (
          <KanjiCard key={kanji} kanji={kanji} level={level} />
        ))}
      </div>
    </LayoutSection>
  )
}
