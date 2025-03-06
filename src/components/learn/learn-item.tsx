import { HTMLAttributes, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '#/lib/utils'

type LearnItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  children: ReactNode
}

export default function LearnItem({
  title,
  children,
  ...props
}: LearnItemProps) {
  return (
    <Card className={cn('w-full text-center py-16', props.className)}>
      <CardHeader>
        <CardTitle className='text-4xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
