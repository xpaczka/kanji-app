import { HTMLAttributes, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'

type DashboardActionItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  children: ReactNode
  onClick: () => void
}

export default function DashboardActionItem({
  title,
  children,
  onClick,
  ...props
}: DashboardActionItemProps) {
  return (
    <Button asChild variant='outline' onClick={onClick}>
      <Card
        className={cn('h-full w-full text-center py-16', props.className)}
        {...props}
      >
        <CardHeader>
          <CardTitle className='text-4xl'>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Button>
  )
}
