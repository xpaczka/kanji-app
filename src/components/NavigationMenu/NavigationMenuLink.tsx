"use client"

import Link, { LinkProps } from "next/link"
import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu"
import { usePathname } from "next/navigation"

type NavigationMenuLinkProps = Omit<LinkProps, "className"> & {
  title: string
}

export default function NavigationMenuLink({
  href,
  title,
  ...props
}: NavigationMenuLinkProps) {
  const pathname = usePathname()

  return (
    <BaseNavigationMenu.Item>
      <BaseNavigationMenu.Link
        render={
          <Link
            href={href}
            className={`${pathname === href ? "border-orange-400 bg-orange-400 text-gray-50" : "border-gray-200 bg-white"} relative block w-[100px] overflow-hidden rounded-md border-2 px-6 py-2 text-center font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-gray-50`}
            {...props}
          >
            {title}
          </Link>
        }
      ></BaseNavigationMenu.Link>
    </BaseNavigationMenu.Item>
  )
}
