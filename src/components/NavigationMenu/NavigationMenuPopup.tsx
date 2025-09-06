import { User } from "@supabase/supabase-js"
import Image from "next/image"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded"
import { signOut } from "#/actions"
import NavigationMenuPopupItem from "./NavigationMenuPopupItem"
import NavigationMenuSubscription from "./NavigationMenuSubscription"

export default function NavigationMenuPopup({ user }: { user: User }) {
  return (
    <>
      <div className="h-3 w-full bg-orange-400" />
      <div className="p-4">
        <div className="flex w-full items-center gap-3">
          <Image
            src="/avatar.jpeg"
            alt="Avatar"
            width={40}
            height={40}
            className="h-12 w-12 rounded-full border-2 border-orange-400 p-[1px]"
          />
          <div>
            <div className="text-xl font-semibold">
              {user.user_metadata.username}
            </div>
            <div className="text-sm text-gray-400">{user.email}</div>
          </div>
        </div>
        <div className="mt-4 h-[1px] w-full bg-gray-200" />
        <div className="-mx-2 flex flex-col gap-0.5 py-3">
          <NavigationMenuSubscription />
          <NavigationMenuPopupItem
            Icon={SettingsSuggestRoundedIcon}
            content="Settings"
          />
        </div>
        <div className="mb-4 h-[1px] w-full bg-gray-200" />
        <button
          className="flex cursor-pointer items-center gap-2"
          onClick={async () => await signOut()}
        >
          <div className="flex w-5 items-center">
            <LogoutRoundedIcon color="error" fontSize="small" />
          </div>
          <p className="font-medium text-red-700">Sign out</p>
        </button>
      </div>
    </>
  )
}
