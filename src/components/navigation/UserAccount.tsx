import { signOut } from "#/actions"
import { Button } from "#/components/ui/button"
import { User } from "@supabase/supabase-js"
import UserPreferences from "./UserPreferences"

type UserAccountProps = {
  user: User | null | undefined
}

export default function UserAccount({ user }: UserAccountProps) {
  if (!user) return null

  return (
    <div>
      <div className="flex items-center gap-3">
        <p>{user.user_metadata.username}</p>
        <UserPreferences />
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  )
}
