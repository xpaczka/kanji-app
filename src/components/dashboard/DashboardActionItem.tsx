import { HTMLAttributes, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { cn } from '#/lib/utils'
import Link from 'next/link'

type DashboardActionItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  children: ReactNode
  href: string
}

export default function DashboardActionItem({
  title,
  children,
  href,
  ...props
}: DashboardActionItemProps) {
  return (
    <Link href={href}>
      <Card
        className={cn('h-full w-full text-center py-16', props.className)}
        {...props}
      >
        <CardHeader>
          <CardTitle className='text-4xl'>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Link>
  )
}
