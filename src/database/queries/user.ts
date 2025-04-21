import { eq } from "drizzle-orm"
import { database } from ".."
import { userTable } from "../schema"

export const createNewUser = async (
  username: string,
  email: string,
  password: string
) => {
  const data = await database
    .insert(userTable)
    .values({ username, email, password })
    .returning({
      id: userTable.id,
      username: userTable.username,
      email: userTable.email
    })

  return data[0]
}

export const getUserById = async (id: string) => {
  const data = await database
    .select({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username
    })
    .from(userTable)
    .where(eq(userTable.id, id))
    .limit(1)

  return data[0]
}

export const getUserByEmail = async (email: string) => {
  const data = await database
    .select({
      id: userTable.id,
      email: userTable.email,
      password: userTable.password
    })
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1)

  return data[0]
}
