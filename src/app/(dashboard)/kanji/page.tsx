import { LayoutSection } from "#/components/Layout"
import { createServerClient } from "../../_trpc/server-client"
import KanjiCard from "#/components/Card/KanjiCard"
import { LearnStage } from "#/types"
import { KanjiStageLabel } from "#/components/Kanji"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"
import Link from "next/link"

export default async function KanjiPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const page = Number((await searchParams).page ?? 1)

  const serverClient = await createServerClient()

  const { items: kanji, hasNextPage } =
    await serverClient.kanji.getKanjiWithPagination({
      page,
      limit: 20
    })

  if (!kanji.length) return null

  return (
    <LayoutSection header="Kanji">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <KanjiStageLabel stage={LearnStage.Stage1} />
        <KanjiStageLabel stage={LearnStage.Stage2} />
        <KanjiStageLabel stage={LearnStage.Stage3} />
        <KanjiStageLabel stage={LearnStage.Stage4} />
        <KanjiStageLabel stage={LearnStage.Stage5} />
      </div>
      <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-5">
        {kanji.map((item) => (
          <KanjiCard key={item.kanji} item={item} />
        ))}
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        {page > 1 && (
          <Link
            href={`?page=${page - 1}`}
            className="cursor-pointer rounded-md border-2 border-gray-200 px-4 py-1 font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-white"
          >
            <ChevronLeftRoundedIcon />
          </Link>
        )}
        <p className="font-medium">{page}</p>
        {hasNextPage && (
          <Link
            href={`?page=${page + 1}`}
            className="cursor-pointer rounded-md border-2 border-gray-200 px-4 py-1 font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-white"
          >
            <ChevronRightRoundedIcon />
          </Link>
        )}
      </div>
    </LayoutSection>
  )
}
