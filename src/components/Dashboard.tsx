import { NavigationMenu } from "./NavigationMenu"
import { LayoutSection } from "./Layout"
import { ROUTES } from "#/constants/router"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded"
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"
import AutoAwesomeMosaicRoundedIcon from "@mui/icons-material/AutoAwesomeMosaicRounded"
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded"
import { DashboardCard, LearnStageCard } from "./Card"
import { LearnStage } from "#/types"
import Footer from "./Footer"

export default function Dashboard() {
  return (
    <>
      <NavigationMenu />
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
          />
          <DashboardCard
            header="Write"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.write}
            Icon={DriveFileRenameOutlineRoundedIcon}
            className="border-green-600 bg-green-500 text-white"
          />
        </div>
      </LayoutSection>
      <LayoutSection header="Progress">
        <div className="grid grid-cols-1 grid-rows-5 gap-6 lg:grid-cols-5 lg:grid-rows-1 lg:gap-10">
          <LearnStageCard stage={LearnStage.Stage1} color="bg-red-400" />
          <LearnStageCard stage={LearnStage.Stage2} color="bg-orange-400" />
          <LearnStageCard stage={LearnStage.Stage3} color="bg-yellow-400" />
          <LearnStageCard stage={LearnStage.Stage4} color="bg-green-400" />
          <LearnStageCard stage={LearnStage.Stage5} color="bg-purple-400" />
        </div>
      </LayoutSection>
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
      <Footer />
    </>
  )
}
