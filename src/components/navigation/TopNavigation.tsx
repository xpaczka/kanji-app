'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '#/components/ui/navigation-menu'
import Link from 'next/link'
import { NAVIGATION_ITEMS } from '#/constants/router'
import { DatabaseUser } from '#/database/schema'
import UserAccount from './UserAccount'

type TopNavigationProps = {
  user: Omit<DatabaseUser, 'password'> | null
}

export default function TopNavigation({ user }: TopNavigationProps) {
  return (
    <NavigationMenu className='py-4 px-10 justify-between max-w-full'>
      <Link href='/'>KANJI APP</Link>
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
      <UserAccount user={user} />
    </NavigationMenu>
  )
}
