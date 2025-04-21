import DashboardCard from "#/components/dashboard/DashboardCard"
import DashboardCardItem from "#/components/dashboard/DashboardCardItem"
import DashboardWeeklyProgressChart from "#/components/dashboard/DashboardWeekyProgressChart"
import DashboardLeaderboard from "#/components/dashboard/DashboardLeaderboard"
import DashboardProgressItem from "#/components/dashboard/DashboardProgressItem"
import { Button } from "#/components/ui/button"
import { createServerClient } from "#/app/_trpc/server-client"
import DashboardLearningOverview from "#/components/dashboard/DashboardLearningOverview"

export default async function Dashboard() {
  const serverClient = await createServerClient()

  const { dailyChallenges, milestones, gamesOverview, weeklyProgress } =
    await serverClient.user.getUserData()

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-8">
      <DashboardLearningOverview className="col-start-1 col-end-2 row-start-1 row-end-2" />
      <DashboardCard
        title="Daily challenges"
        className="col-start-2 col-end-3 row-start-1 row-end-2"
      >
        <div className="flex flex-col gap-3">
          {dailyChallenges.map(({ name, value }) => (
            <DashboardProgressItem key={name} title={name} progress={value} />
          ))}
        </div>
      </DashboardCard>
      <DashboardCard
        title="Games overview"
        className="col-start-1 col-end-2 row-start-2 row-end-3"
      >
        <DashboardCardItem title="Points earned" className="mb-2">
          <p className="text-xl font-bold">{gamesOverview.points}</p>
        </DashboardCardItem>
        <DashboardCardItem title="Favorite game" className="mb-2">
          <div className="flex items-center gap-2">
            <div className="aspect-square h-[40px] min-w-[40px] border-2" />
            <p>{gamesOverview.favoriteGame}</p>
            <Button>Play</Button>
          </div>
        </DashboardCardItem>
      </DashboardCard>
      <DashboardCard
        title="Milestones"
        className="col-start-2 col-end-3 row-start-2 row-end-3"
      >
        <div className="flex flex-col gap-3">
          {milestones.map(({ name, value }) => (
            <DashboardProgressItem key={name} title={name} progress={value} />
          ))}
        </div>
      </DashboardCard>
      <DashboardCard
        title="Leaderboard"
        className="col-start-3 col-end-4 row-start-1 row-end-4"
      >
        <DashboardLeaderboard />
      </DashboardCard>
      <DashboardCard
        title="Weekly progress"
        className="col-start-1 col-end-3 row-start-3 row-end-4"
      >
        <div className="w-1/2">
          <DashboardWeeklyProgressChart data={weeklyProgress} />
        </div>
      </DashboardCard>
    </div>
  )
}
