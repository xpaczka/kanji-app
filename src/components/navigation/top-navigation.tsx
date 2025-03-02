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

const NAV_ITEMS = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/learn', title: 'Learn' },
  { href: '/games', title: 'Games' },
]

export default function TopNavigation() {
  return (
    <NavigationMenu className='p-4 justify-between max-w-full'>
      <div>KANJI APP</div>
      <NavigationMenuList>
        {NAV_ITEMS.map(({ href, title }) => (
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
