import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { HTMLAttributes } from 'react'
import { Progress } from '../ui/progress'

type DashboardCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string
}

export default function DashboardCard({ title, ...props }: DashboardCardProps) {
  return (
    <div {...props}>
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <p className='mb-2'>Level progress</p>
            <div className='flex items-center gap-2'>
              <div className='h-[40px] w-[40px] border-2' />
              <Progress value={30} />
            </div>
          </div>
          <div>
            <p className='mb-2'>Level progress</p>
            <div className='flex items-center gap-2'>
              <div className='h-[40px] w-[40px] border-2' />
              <Progress value={30} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
