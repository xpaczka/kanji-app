import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu"
import Link, { LinkProps } from "next/link"

type NavigationMenuLinkProps = Omit<LinkProps, "className"> & {
  title: string
}

export default function NavigationMenuLink({
  title,
  ...props
}: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Item>
      <BaseNavigationMenu.Link
        render={
          <Link
            className="block w-[100px] rounded-md border-2 border-gray-200 px-6 py-2 text-center font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:font-semibold hover:text-white"
            {...props}
          />
        }
      >
        {title}
      </BaseNavigationMenu.Link>
    </BaseNavigationMenu.Item>
  )
}
