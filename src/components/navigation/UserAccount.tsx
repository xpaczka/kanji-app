import { DatabaseUser } from '#/database/schema'

type UserAccountProps = {
  user: Omit<DatabaseUser, 'password'> | null
}

export default function UserAccount({ user }: UserAccountProps) {
  return <div>{user && <p>{user.username}</p>}</div>
}
