'use client'

import DashboardCard from '#/components/dashboard/dashboard-card'
import { useUser } from '@clerk/nextjs'

export default function Dashboard() {
  const { user } = useUser()

  if (!user) return null

  return (
    <>
      <div className='mb-6'>Hello, {user.username}</div>
      <div className='grid grid-cols-3 grid-rows-3 gap-8'>
        <DashboardCard
          title='Learning overview'
          className='col-start-1 col-end-2 row-start-1 row-end-2'
        />
        <DashboardCard
          title='Daily challenges'
          className='col-start-2 col-end-3 row-start-1 row-end-2'
        />
        <DashboardCard
          title='Games overview'
          className='col-start-1 col-end-2 row-start-2 row-end-3'
        />
        <DashboardCard
          title='Milestones'
          className='col-start-2 col-end-3 row-start-2 row-end-3'
        />
        <DashboardCard
          title='Leaderboard'
          className='col-start-3 col-end-4 row-start-1 row-end-4'
        />
        <DashboardCard
          title='Weekly progress'
          className='col-start-1 col-end-3 row-start-3 row-end-4'
        />
      </div>
    </>
  )
}
