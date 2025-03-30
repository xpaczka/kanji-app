import { eq } from 'drizzle-orm'
import { database } from '.'
import { KanjiItemJlptLevel, kanjiTable, userTable } from './schema'

export const getAllKanjiQuery = async () =>
  await database.select().from(kanjiTable)

export const getKanjiByLevelQuery = async (level: KanjiItemJlptLevel) =>
  await database.select().from(kanjiTable).where(eq(kanjiTable.level, level))

export const getUserById = async (id: string) => {
  const data = await database
    .select({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username,
    })
    .from(userTable)
    .where(eq(userTable.id, id))
    .limit(1)

  return data[0]
}
