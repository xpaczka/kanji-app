import { User } from "@supabase/supabase-js"
import Image from "next/image"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { signOut } from "#/actions"

export default function NavigationMenuPopup({ user }: { user: User | null }) {
  if (!user) return null

  return (
    <>
      <div className="h-3 w-full bg-orange-400" />
      <div className="p-4">
        <div className="flex w-full items-center gap-5">
          <Image
            src="/avatar.jpeg"
            alt="Avatar"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border-2 border-orange-400"
          />
          <div>
            <div className="text-xl font-semibold">
              {user.user_metadata.username}
            </div>
            <div className="text-sm text-gray-400">{user.email}</div>
          </div>
        </div>
        <div className="my-4 h-[1px] w-full bg-gray-200" />
        <div className="my-4 h-[1px] w-full bg-gray-200" />
        <button
          className="flex cursor-pointer items-center gap-1"
          onClick={async () => await signOut()}
        >
          <LogoutRoundedIcon color="error" />
          <p className="font-semibold text-red-700">Sign out</p>
        </button>
      </div>
    </>
  )
}
