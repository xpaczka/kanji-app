import { ROUTES } from "#/constants/router"
import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu"
import NavigationMenuAvatar from "./NavigationMenuAvatar"
import NavigationMenuLink from "./NavigationMenuLink"

export default function NavigationMenu() {
  return (
    <BaseNavigationMenu.Root className="fixed top-0 right-0 left-0 flex w-full items-center justify-between gap-16 bg-white px-10 py-3 shadow-md">
      <BaseNavigationMenu.Item className="text-2xl font-bold">
        KANJI APP
      </BaseNavigationMenu.Item>
      <BaseNavigationMenu.List className="flex flex-1 justify-end gap-8">
        <NavigationMenuLink href={ROUTES.learn} title="Learn" />
        <NavigationMenuLink href={ROUTES.play} title="Play" />
      </BaseNavigationMenu.List>
      <NavigationMenuAvatar />
    </BaseNavigationMenu.Root>
  )
}
