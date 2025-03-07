import DashboardCard from '#/components/dashboard/dashboard-card'
import DashboardCardItem from '#/components/dashboard/dashboard-card-item'
import DashboardWeeklyProgressChart from '#/components/dashboard/dashboard-weekly-progress-chart'
import DashboardLeaderboard from '#/components/dashboard/dashboard-leaderboard'
import DashboardProgressItem from '#/components/dashboard/dashboard-progress-item'
import { Button } from '#/components/ui/button'

export default async function Dashboard() {
  const weeklyProgressRequest = await fetch(
    'http://localhost:3000/api/statistics/user'
  )

  const { data: weeklyProgress } = await weeklyProgressRequest.json()

  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>Dashboard</h1>
      <div className='grid grid-cols-3 grid-rows-3 gap-8'>
        <DashboardCard
          title='Learning overview'
          className='col-start-1 col-end-2 row-start-1 row-end-2'
        >
          <DashboardProgressItem
            title='Level progress'
            progress={60}
            className='mb-2'
          />
          <DashboardProgressItem title='Kanji proficiency' progress={45} />
        </DashboardCard>
        <DashboardCard
          title='Daily challenges'
          className='col-start-2 col-end-3 row-start-1 row-end-2'
        >
          <DashboardProgressItem
            title='Complete 5 lessons'
            progress={80}
            className='mb-2'
          />
          <DashboardProgressItem title='Play 3 games' progress={33} />
        </DashboardCard>
        <DashboardCard
          title='Games overview'
          className='col-start-1 col-end-2 row-start-2 row-end-3'
        >
          <DashboardCardItem title='Points earned' className='mb-2'>
            <p className='text-xl font-bold'>20,000</p>
          </DashboardCardItem>
          <DashboardCardItem title='Favorite game' className='mb-2'>
            <div className='flex items-center gap-2'>
              <div className='h-[40px] min-w-[40px] aspect-square border-2' />
              <p>Memo</p>
              <Button>Play</Button>
            </div>
          </DashboardCardItem>
        </DashboardCard>
        <DashboardCard
          title='Milestones'
          className='col-start-2 col-end-3 row-start-2 row-end-3'
        >
          <DashboardProgressItem
            title='Earn 1000 XP'
            progress={25}
            className='mb-2'
          />
          <DashboardProgressItem
            title='Maintain a 7-day streak'
            progress={40}
          />
        </DashboardCard>
        <DashboardCard
          title='Leaderboard'
          className='col-start-3 col-end-4 row-start-1 row-end-4'
        >
          <DashboardLeaderboard />
        </DashboardCard>
        <DashboardCard
          title='Weekly progress'
          className='col-start-1 col-end-3 row-start-3 row-end-4'
        >
          <div className='w-1/2'>
            <DashboardWeeklyProgressChart data={weeklyProgress} />
          </div>
        </DashboardCard>
      </div>
    </>
  )
}
