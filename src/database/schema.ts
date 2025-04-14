import { InferInsertModel } from "drizzle-orm"
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"
import { z } from "zod"

export type KanjiItemJlptLevel = z.infer<typeof kanjiItemJlptLevel>
export type DatabaseKanji = InferInsertModel<typeof kanjiTable>
export type DatabaseUser = InferInsertModel<typeof userTable>

export const kanjiItemJlptLevel = z.enum([
  "jlpt-n1",
  "jlpt-n2",
  "jlpt-n3",
  "jlpt-n4",
  "jlpt-n5"
])

export const kanjiTable = pgTable("kanji", {
  id: uuid().primaryKey().defaultRandom(),
  kanji: varchar({ length: 1 }).notNull().unique(),
  level: varchar({ length: 7 }).notNull().$type<KanjiItemJlptLevel>(),
  meanings: text().array().notNull(),
  kun_readings: text().array().notNull(),
  on_readings: text().array().notNull()
})

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar().notNull().unique(),
  username: varchar().notNull().unique(),
  password: varchar().notNull()
})
