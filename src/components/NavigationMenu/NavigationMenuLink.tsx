import Link, { LinkProps } from "next/link"
import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu"

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
            className="relative block w-[100px] overflow-hidden rounded-md border-2 border-gray-200 px-6 py-2 text-center font-semibold transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-gray-50"
            {...props}
          >
            {title}
          </Link>
        }
      ></BaseNavigationMenu.Link>
    </BaseNavigationMenu.Item>
  )
}
