'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
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
        {paths.map((pathname, index) =>
          index === paths.length - 1 ? (
            <BreadcrumbItem key={pathname}>
              <BreadcrumbPage className='font-bold text-lg'>
                {capitalizePathname(pathname)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={pathname}>
              <BreadcrumbItem>
                <BreadcrumbLink href='/' className='text-lg'>
                  {capitalizePathname(pathname)}
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
