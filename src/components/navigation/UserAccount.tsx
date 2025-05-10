import { signOut } from "#/actions/auth"
import { Button } from "#/components/ui/button"
import { User } from "#/schemas/user"
import UserPreferences from "./UserPreferences"

type UserAccountProps = {
  user: User | undefined
}

export default function UserAccount({ user }: UserAccountProps) {
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
