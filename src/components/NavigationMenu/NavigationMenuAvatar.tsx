"use client"

import { Avatar } from "@base-ui-components/react/avatar"
import { Popover } from "@base-ui-components/react/popover"
import { motion } from "motion/react"
import NavigationMenuPopup from "./NavigationMenuPopup"
import { User } from "@supabase/supabase-js"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import { useState } from "react"

export default function NavigationMenuAvatar({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="min-w-14">
        <Avatar.Root className="flex cursor-pointer items-center gap-0.5">
          <Avatar.Image
            src="avatar.jpeg"
            className="h-14 w-14 rounded-full border-2 border-orange-400 p-0.5"
            alt="Avatar"
          />
          <KeyboardArrowDownRoundedIcon fontSize="large" color="disabled" />
        </Avatar.Root>
      </Popover.Trigger>
      {open && (
        <Popover.Portal keepMounted>
          <Popover.Positioner sideOffset={8} positionMethod="fixed" align="end">
            <Popover.Popup
              className="min-w-2xs overflow-hidden rounded-md bg-white shadow-lg"
              render={
                <motion.div
                  initial={{ opacity: 0, translateY: "-20px" }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: "-20px" }}
                />
              }
            >
              <NavigationMenuPopup user={user} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      )}
    </Popover.Root>
  )
}
