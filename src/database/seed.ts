import { Pool } from "pg"
import fs from "fs"
import { drizzle } from "drizzle-orm/node-postgres"
import { reset } from "drizzle-seed"
import {
  KanjiItemJlptLevel,
  kanjiTable,
  userKanjiHistoryTable,
  userTable
} from "./schema"

// Retrieve the command-line arguments
const args = process.argv.slice(2)
const argsMap = new Map()

for (let i = 0; i < args.length; i += 2) {
  argsMap.set(args[i], args[i + 1])
}

const databaseUrl = argsMap.get("--database-url")
const kanjiDataPath = argsMap.get("--data-path")

const main = async () => {
  if (!databaseUrl) {
    throw Error("Database URL not defined")
  }

  if (!kanjiDataPath) {
    throw Error("Kanji data path not defined")
  }

  const kanjiData = JSON.parse(
    fs.readFileSync(kanjiDataPath, { encoding: "utf-8" })
  ) as (typeof kanjiTable.$inferInsert)[]

  if (!kanjiData || kanjiData.length === 0) {
    throw Error("No data to be seeded")
  }

  const pool = new Pool({ connectionString: databaseUrl })
  const database = drizzle(pool)

  const kanji: (typeof kanjiTable.$inferInsert)[] = kanjiData.map((item) => ({
    kanji: item.kanji,
    level: item.level as KanjiItemJlptLevel,
    meanings: item.meanings ?? [],
    on_readings: item.on_readings ?? [],
    kun_readings: item.kun_readings ?? []
  }))

  console.log("Seeding database..")

  // Reset tables before inserting new data
  await reset(database, { kanjiTable, userTable, userKanjiHistoryTable })

  // Insert kanji data into the database
  await database.insert(kanjiTable).values(kanji)

  console.log("Seeding completed")
}

main()
