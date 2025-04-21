import { eq } from "drizzle-orm"
import { database } from ".."
import { kanjiTable, KanjiItemJlptLevel } from "../schema"

export const getAllKanjiQuery = async () =>
  await database.select().from(kanjiTable)

export const getKanjiByLevelQuery = async (level: KanjiItemJlptLevel) =>
  await database.select().from(kanjiTable).where(eq(kanjiTable.level, level))
