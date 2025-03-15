import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'

export const kanjiTable = pgTable('kanji', {
  id: uuid().primaryKey(),
  kanji: varchar({ length: 1 }).notNull().unique(),
  level: varchar({ length: 7 }).notNull(),
  meanings: text().array().notNull(),
  kun_readings: text().array().notNull(),
  on_readings: text().array(),
})
