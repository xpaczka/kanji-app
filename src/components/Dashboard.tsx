import { LayoutSection } from "./Layout"
import { ROUTES } from "#/constants/router"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded"
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"
import AutoAwesomeMosaicRoundedIcon from "@mui/icons-material/AutoAwesomeMosaicRounded"
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded"
import { DashboardCard } from "./Card"
import { LearnProgress } from "./Learn"
import { createServerClient } from "#/app/_trpc/server-client"
import { FLASHCARDS_GAME_KANJI_COUNT, MEMO_GAME_KANJI_COUNT } from "#/constants"

export default async function Dashboard() {
  const serverClient = await createServerClient()
  const { count: learnCount } = await serverClient.learn.getLearnItems()
  const { count: reviewCount } = await serverClient.review.getReviewItems()

  const { count: flashcardsCount } =
    await serverClient.flashcards.getFlashcardsGameKanji()

  const { count: memoGameCount } =
    await serverClient.memoGame.getMemoGameKanji()

  return (
    <>
      <LayoutSection header="Knowledge">
        <div className="grid grid-cols-1 grid-rows-3 gap-6 lg:grid-cols-3 lg:grid-rows-1 lg:gap-10">
          <DashboardCard
            header="Learn"
            description="Discover new kanji with meanings and readings to build your foundation"
            href={ROUTES.learn}
            Icon={SchoolRoundedIcon}
            className="border-red-600 bg-red-500 text-white"
            disabled={learnCount === 0}
            indicator={learnCount}
          />
          <DashboardCard
            header="Review"
            description="Reinforce what you’ve learned and strengthen long-term memory"
            href={ROUTES.review}
            Icon={VisibilityRoundedIcon}
            className="border-blue-600 bg-blue-500 text-white"
            disabled={reviewCount === 0}
            indicator={reviewCount}
          />
          <DashboardCard
            header="Write"
            description="Practice writing kanji by hand to deepen understanding and recall"
            href={ROUTES.write}
            Icon={DriveFileRenameOutlineRoundedIcon}
            className="border-green-600 bg-green-500 text-white"
            // TODO: Get items for write module
            disabled
            indicator={0}
          />
        </div>
      </LayoutSection>
      <LearnProgress />
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
    </>
  )
}
