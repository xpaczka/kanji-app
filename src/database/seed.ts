import { Pool } from 'pg'
import { data as kanjiData } from '../../scripts/data.json'
import { KanjiItemJlptLevel, kanjiTable } from './schema'
import { drizzle } from 'drizzle-orm/node-postgres'
import { reset } from 'drizzle-seed'

const args = process.argv.slice(2)
const argsMap = new Map()

for (let i = 0; i < args.length; i += 2) {
  argsMap.set(args[i], args[i + 1])
}

const databaseUrl = argsMap.get('--database-url')

const main = async () => {
  if (!kanjiData) {
    throw Error('No data to be seeded')
  }

  if (!databaseUrl) {
    throw Error('Database URL not defined')
  }

  const pool = new Pool({ connectionString: databaseUrl })
  const database = drizzle(pool)

  const kanji: (typeof kanjiTable.$inferInsert)[] = kanjiData.map((item) => ({
    kanji: item.kanji,
    level: item.level as KanjiItemJlptLevel,
    meanings: item.meanings ?? [],
    on_readings: item.on_readings ?? [],
    kun_readings: item.kun_readings ?? [],
  }))

  console.log('Seeding database..')

  await reset(database, { kanji })

  console.log('Seeding completed')
}

main()
