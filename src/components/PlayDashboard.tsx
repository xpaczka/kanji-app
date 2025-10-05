import { createServerClient } from "#/app/_trpc/server-client"
import {
  ROUTES,
  MEMO_GAME_KANJI_COUNT,
  FLASHCARDS_GAME_KANJI_COUNT
} from "#/constants"
import { DashboardCard } from "./Card"
import AutoAwesomeMosaicRoundedIcon from "@mui/icons-material/AutoAwesomeMosaicRounded"
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded"
import LayoutSection from "./LayoutSection"

export default async function PlayDashboard() {
  const serverClient = await createServerClient()

  const { count: flashcardsCount } =
    await serverClient.flashcards.getFlashcardsGameKanji()

  const { count: memoGameCount } =
    await serverClient.memoGame.getMemoGameKanji()

  return (
    <LayoutSection header="Games">
      <div className="grid grid-cols-1 grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1 lg:gap-10">
        <DashboardCard
          header="Memo"
          description="Train your memory by matching pairs of cards"
          href={ROUTES.playMemo}
          Icon={AutoAwesomeMosaicRoundedIcon}
          className="shadow-lg"
          disabled={memoGameCount < MEMO_GAME_KANJI_COUNT}
        />
        <DashboardCard
          header="Flashcards"
          description="Review and practice key concepts with interactive flashcards"
          href={ROUTES.playFlashcards}
          Icon={AutoAwesomeMotionRoundedIcon}
          className="shadow-lg"
          disabled={flashcardsCount < FLASHCARDS_GAME_KANJI_COUNT}
        />
      </div>
    </LayoutSection>
  )
}
