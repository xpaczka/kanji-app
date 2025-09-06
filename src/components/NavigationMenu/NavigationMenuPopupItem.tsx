import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import Link from "next/link"
import { ReactNode } from "react"

type NavigationMenuPopupItemProps = {
  content: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string
  }
  href: string
}

export default function NavigationMenuPopupItem({
  content,
  href,
  Icon
}: NavigationMenuPopupItemProps) {
  return (
    <Link href={href}>
      <div className="flex cursor-pointer items-center gap-2 rounded-sm p-2 transition duration-150 ease-in-out hover:bg-gray-100">
        <div className="flex w-5 items-center">
          <Icon fontSize="small" />
        </div>
        {typeof content === "string" ? (
          <p className="font-medium">{content}</p>
        ) : (
          content
        )}
      </div>
    </Link>
  )
}
