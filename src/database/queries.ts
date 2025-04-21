import { desc, eq } from "drizzle-orm"
import { database } from "."
import {
  DatabaseUserKanjiHistory,
  KanjiItemJlptLevel,
  kanjiTable,
  userKanjiHistoryTable,
  userTable
} from "./schema"
import { KanjiSessionSetItem } from "#/schemas/kanji"

export const getAllKanjiQuery = async () =>
  await database.select().from(kanjiTable)

export const getKanjiByLevelQuery = async (level: KanjiItemJlptLevel) =>
  await database.select().from(kanjiTable).where(eq(kanjiTable.level, level))

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

export const updateUserKanjiHistory = async (
  userId: string,
  kanji: KanjiSessionSetItem
) => {
  const kanjiHistoryData: DatabaseUserKanjiHistory = {
    kanji_id: kanji.id,
    user_id: userId
  }

  const newTimestamp = new Date()

  await database
    .insert(userKanjiHistoryTable)
    .values(kanjiHistoryData)
    .onConflictDoUpdate({
      target: [userKanjiHistoryTable.user_id, userKanjiHistoryTable.kanji_id],
      set: { timestamp: newTimestamp }
    })
}

export const getUserKanjiHistory = async (userId: string) =>
  await database
    .select({
      kanji: kanjiTable.kanji,
      level: kanjiTable.level,
      timestamp: userKanjiHistoryTable.timestamp
    })
    .from(userKanjiHistoryTable)
    .where(eq(userKanjiHistoryTable.user_id, userId))
    .leftJoin(kanjiTable, eq(userKanjiHistoryTable.kanji_id, kanjiTable.id))
    .orderBy(desc(userKanjiHistoryTable.timestamp))
