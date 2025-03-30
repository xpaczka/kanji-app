import { logout } from '#/actions/auth'
import { DatabaseUser } from '#/database/schema'
import { Button } from '../ui/button'

type UserAccountProps = {
  user: Omit<DatabaseUser, 'password'> | null
}

export default function UserAccount({ user }: UserAccountProps) {
  return (
    <div>
      {user && (
        <div className='flex items-center gap-2'>
          <p>{user.username}</p>
          <Button onClick={logout}>Sign out</Button>
        </div>
      )}
    </div>
  )
}
