"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "#/components/ui/navigation-menu"
import Link from "next/link"
import { NAVIGATION_ITEMS } from "#/constants/router"
import { DatabaseUser } from "#/database/schema"
import UserAccount from "./UserAccount"
import { useUserStore } from "#/store/user"
import { useEffect } from "react"

type TopNavigationProps = {
  user: Omit<DatabaseUser, "password"> | null
}

export default function TopNavigation({ user }: TopNavigationProps) {
  const userId = useUserStore((state) => state.userId)
  const setUserId = useUserStore((state) => state.setUserId)

  useEffect(() => {
    if (!user || userId) return
    setUserId({ userId: user.id ?? null })
  }, [user, setUserId, userId])

  return (
    <NavigationMenu className="max-w-full justify-between px-10 py-4">
      <Link href="/">KANJI APP</Link>
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
