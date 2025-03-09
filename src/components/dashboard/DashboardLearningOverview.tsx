import { HTMLAttributes } from 'react'
import { serverClient } from '#/app/_trpc/server-client'
import DashboardCard from './DashboardCard'
import DashboardProgressItem from './DashboardProgressItem'

export default async function DashboardLearningOverview({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const learningOverview = await serverClient.user.getSelectedUserProgress({
    username: 'user',
    key: 'learningOverview',
  })

  return (
    <DashboardCard title='Learning overview' {...props}>
      <div className='flex flex-col gap-3'>
        {learningOverview.map(({ name, value }) => (
          <DashboardProgressItem key={name} title={name} progress={value} />
        ))}
      </div>
    </DashboardCard>
  )
}
