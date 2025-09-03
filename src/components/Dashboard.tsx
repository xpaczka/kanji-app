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

export default async function Dashboard() {
  const serverClient = await createServerClient()
  const { count: reviewCount } = await serverClient.review.getReviewItems()

  return (
    <>
      <LayoutSection header="Knowledge">
        <div className="grid grid-cols-1 grid-rows-3 gap-6 lg:grid-cols-3 lg:grid-rows-1 lg:gap-10">
          <DashboardCard
            header="Learn"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.learn}
            Icon={SchoolRoundedIcon}
            className="border-red-600 bg-red-500 text-white"
          />
          <DashboardCard
            header="Review"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.review}
            Icon={VisibilityRoundedIcon}
            className="border-blue-600 bg-blue-500 text-white"
            disabled={!reviewCount}
            indicator={
              reviewCount && (
                <div className="rounded-lg border-2 border-gray-600 bg-white px-4 text-lg font-medium text-black">
                  {reviewCount}
                </div>
              )
            }
          />
          <DashboardCard
            header="Write"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.write}
            Icon={DriveFileRenameOutlineRoundedIcon}
            className="border-green-600 bg-green-500 text-white"
            disabled
          />
        </div>
      </LayoutSection>
      <LearnProgress />
      <LayoutSection header="Games">
        <div className="grid grid-cols-1 grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1 lg:gap-10">
          <DashboardCard
            header="Memo"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.playMemo}
            Icon={AutoAwesomeMosaicRoundedIcon}
            className="shadow-lg"
          />
          <DashboardCard
            header="Flashcards"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.playFlashcards}
            Icon={AutoAwesomeMotionRoundedIcon}
            className="shadow-lg"
          />
        </div>
      </LayoutSection>
    </>
  )
}
