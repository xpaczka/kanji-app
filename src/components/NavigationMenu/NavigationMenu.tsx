import { NAVIGATION_ITEMS } from "#/constants/router"
import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu"
import NavigationMenuAvatar from "./NavigationMenuAvatar"
import NavigationMenuLink from "./NavigationMenuLink"
import createSupabaseClient from "#/database/client"
import Image from "next/image"

export default async function NavigationMenu() {
  const serverClient = await createSupabaseClient()

  const {
    data: { user }
  } = await serverClient.auth.getUser()

  return (
    <BaseNavigationMenu.Root className="fixed top-0 right-0 left-0 z-20 flex h-20 w-full items-center justify-between gap-16 bg-white px-10 py-3 shadow-md">
      <BaseNavigationMenu.Item>
        <Image src="/logo.svg" alt="Logo" width={160} height={34} />
      </BaseNavigationMenu.Item>
      <BaseNavigationMenu.List className="flex flex-1 justify-end gap-8">
        {NAVIGATION_ITEMS.map(({ title, href }) => (
          <NavigationMenuLink key={title} href={href} title={title} />
        ))}
      </BaseNavigationMenu.List>
      <NavigationMenuAvatar user={user} />
    </BaseNavigationMenu.Root>
  )
}
