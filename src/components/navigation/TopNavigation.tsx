"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "#/components/ui/navigation-menu"
import Link from "next/link"
import { NAVIGATION_ITEMS, ROUTES } from "#/constants/router"
import UserAccount from "./UserAccount"
import { User } from "#/schemas/user"

type TopNavigationProps = {
  user: User | undefined
}

export default function TopNavigation({ user }: TopNavigationProps) {
  return (
    <NavigationMenu className="max-w-full justify-between px-10 py-4">
      <Link href={ROUTES.index}>KANJI APP</Link>
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
