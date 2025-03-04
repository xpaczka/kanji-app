import { Progress } from '@radix-ui/react-progress'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { HTMLAttributes } from 'react'

export default function DashboardCard({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Learning overview</CardTitle>
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
