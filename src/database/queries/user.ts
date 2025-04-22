import { eq } from "drizzle-orm"
import { database } from ".."
import { UserPreferences, userTable } from "../schema"

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

export const getUserById = async (userId: string) => {
  const data = await database
    .select({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username
    })
    .from(userTable)
    .where(eq(userTable.id, userId))
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

export const getUserPreferences = async (userId: string) => {
  const data = await database
    .select({ preferences: userTable.preferences })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1)

  return data[0].preferences
}

export const updateUserPreferences = async (
  userId: string,
  preferences: UserPreferences
) => {
  await database
    .update(userTable)
    .set({ preferences })
    .where(eq(userTable.id, userId))
}
