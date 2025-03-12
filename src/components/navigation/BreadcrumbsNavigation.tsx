'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

const capitalizePathname = (pathname: string) =>
  `${pathname[0].toUpperCase()}${pathname.slice(1)}`

export default function BreadcrumbsNavigation() {
  const pathname = usePathname()
  const paths = pathname.slice(1).split('/')

  return (
    <Breadcrumb className='mb-8'>
      <BreadcrumbList>
        {paths.map((path, index) =>
          index === paths.length - 1 ? (
            <BreadcrumbItem key={path}>
              <BreadcrumbPage className='font-bold text-lg'>
                {capitalizePathname(path)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink className='text-lg' asChild>
                  <Link href={`/${paths.slice(0, -index - 1).join('/')}`}>
                    {capitalizePathname(path)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
