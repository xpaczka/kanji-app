"use client"

import { signOut } from "#/actions/auth"
import { trpc } from "#/app/_trpc/client"
import { Button } from "../ui/button"

export default function UserAccount() {
  const { data: user } = trpc.user.getUser.useQuery()

  if (!user) return null

  return (
    <div>
      <div className="flex items-center gap-2">
        <p>{user.username}</p>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  )
}
