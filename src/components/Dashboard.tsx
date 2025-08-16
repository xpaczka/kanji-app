import { NavigationMenu } from "./NavigationMenu"
import { LayoutSection } from "./Layout"
import { ROUTES } from "#/constants/router"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded"
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"
import { DashboardCard } from "./Card"

export default function Dashboard() {
  return (
    <>
      <NavigationMenu />
      <LayoutSection header="Knowledge">
        <div className="grid grid-cols-1 grid-rows-3 gap-12 lg:grid-cols-3 lg:grid-rows-1">
          <DashboardCard
            header="Learn"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.learn}
            Icon={SchoolRoundedIcon}
          />
          <DashboardCard
            header="Review"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.review}
            Icon={VisibilityRoundedIcon}
          />
          <DashboardCard
            header="Write"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            href={ROUTES.write}
            Icon={DriveFileRenameOutlineRoundedIcon}
          />
        </div>
      </LayoutSection>
    </>
  )
}
