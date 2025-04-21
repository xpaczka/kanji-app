import { KanjiSessionSetItem } from "#/schemas/kanji"
import { eq, desc } from "drizzle-orm"
import { database } from ".."
import {
  DatabaseUserKanjiHistory,
  userKanjiHistoryTable,
  kanjiTable
} from "../schema"

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
