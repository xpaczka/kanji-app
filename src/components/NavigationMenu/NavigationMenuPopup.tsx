import { User } from "@supabase/supabase-js"
import Image from "next/image"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { signOut } from "#/actions"
import { groupKanjiProgressByStageName } from "#/utils"
import { trpc } from "#/app/_trpc/client"
import { useMemo } from "react"
import { LearnStage } from "#/types"
import { LEARN_STAGE_COLORS } from "#/constants"

export default function NavigationMenuPopup({ user }: { user: User }) {
  const { data: userKanjiProgress } = trpc.kanji.getUserKanjiProgress.useQuery()

  const currentUserLevel = useMemo(() => {
    const stages = groupKanjiProgressByStageName(userKanjiProgress ?? [])

    return Object.entries(stages).sort(
      (a, b) => b[1] - a[1]
    )[0][0] as LearnStage
  }, [userKanjiProgress])

  console.log(currentUserLevel)

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
        <div className="mt-2 flex items-center gap-2">
          <div
            className={`${LEARN_STAGE_COLORS[currentUserLevel]} h-4 w-4 rounded-full`}
          />
          <p className="font-medium">{currentUserLevel}</p>
        </div>
        <div className="mt-4 h-[1px] w-full bg-gray-200" />
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
