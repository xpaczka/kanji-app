"use client"
import { trpc } from "#/app/_trpc/client"
import { useEffect, useState } from "react"

export const useUserRomajiPreferences = () => {
  const { data: userPreferences, isFetched } =
    trpc.user.getUserPreferences.useQuery()

  const [showRomaji, setShowRomaji] = useState(false)

  useEffect(() => {
    if (!isFetched) return

    setShowRomaji(userPreferences ? userPreferences.showRomaji : false)
  }, [isFetched, userPreferences])

  return { showRomaji, setShowRomaji }
}
