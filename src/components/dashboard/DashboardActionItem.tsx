import { HTMLAttributes, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { cn } from '#/lib/utils'

type DashboardActionItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  children: ReactNode
}

export default function DashboardActionItem({
  title,
  children,
  ...props
}: DashboardActionItemProps) {
  return (
    <Card
      className={cn('w-full text-center py-16', props.className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className='text-4xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
