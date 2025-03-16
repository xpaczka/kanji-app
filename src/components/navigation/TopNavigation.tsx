'use client'

import { UserButton } from '@clerk/nextjs'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '#/components/ui/navigation-menu'
import Link from 'next/link'
import { NAVIGATION_ITEMS } from '#/constants/router'

export default function TopNavigation() {
  return (
    <NavigationMenu className='py-4 px-10 justify-between max-w-full'>
      <div>KANJI APP</div>
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map(({ href, title }) => (
          <NavigationMenuItem key={title}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <UserButton />
    </NavigationMenu>
  )
}
