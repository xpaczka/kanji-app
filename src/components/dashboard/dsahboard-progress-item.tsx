import { HTMLAttributes } from 'react'
import { Progress } from '../ui/progress'
import DashboardCardItem from './dashboard-card-item'

type DashboardProgressItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  progress: number
}

export default function DashboardProgressItem({
  title,
  progress,
  ...props
}: DashboardProgressItemProps) {
  return (
    <DashboardCardItem title={title} {...props}>
      <div className='flex items-center gap-2'>
        <div className='h-[40px] min-w-[40px] aspect-square border-2' />
        <Progress value={progress} />
        <p>{progress}%</p>
      </div>
    </DashboardCardItem>
  )
}
