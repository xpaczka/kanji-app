import { signOut } from "#/actions/auth"
import { trpc } from "#/app/_trpc/client"
import { Button } from "#/components/ui/button"
import UserPreferences from "./UserPreferences"

export default function UserAccount() {
  const { data: user } = trpc.user.getUser.useQuery()

  if (!user) return null

  return (
    <div>
      <div className="flex items-center gap-3">
        <p>{user.username}</p>
        <UserPreferences />
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  )
}
