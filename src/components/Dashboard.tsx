import { ROUTES } from "#/constants/router"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded"
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"
import { DashboardCard } from "./Card"
import { LearnProgress } from "./Learn"
import { createServerClient } from "#/app/_trpc/server-client"
import PlayDashboard from "./PlayDashboard"
import LayoutSection from "./LayoutSection"

export default async function Dashboard() {
  const serverClient = await createServerClient()
  const { count: learnCount } = await serverClient.learn.getLearnItems()
  const { count: reviewCount } = await serverClient.review.getReviewItems()

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
      <PlayDashboard />
    </>
  )
}
