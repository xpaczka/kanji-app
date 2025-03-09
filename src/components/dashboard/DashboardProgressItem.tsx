import { HTMLAttributes } from 'react'
import { Progress } from '../ui/progress'
import DashboardCardItem from './DashboardCardItem'
import DashboardImage from './DashboardImage'

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
        <DashboardImage />
        <Progress value={progress} />
        <p>{progress}%</p>
      </div>
    </DashboardCardItem>
  )
}
