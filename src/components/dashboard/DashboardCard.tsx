import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { HTMLAttributes, ReactNode } from 'react'

type DashboardCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  title?: string
}

export default function DashboardCard({
  children,
  title,
  ...props
}: DashboardCardProps) {
  return (
    <div {...props}>
      <Card className='h-full'>
        {title && (
          <CardHeader>
            <CardTitle className='text-lg'>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
