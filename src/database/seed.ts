import { Pool } from 'pg'
import { data as kanjiData } from '../../scripts/data.json'
import { kanjiTable } from './schema'
import { v4 as uuid } from 'uuid'
import { drizzle } from 'drizzle-orm/node-postgres'
import { KanjiItemJlptLevel } from '#/schemas/kanji'

const main = async () => {
  const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@localhost:5432/postgres',
  })
  const database = drizzle(pool)

  const data: (typeof kanjiTable.$inferInsert)[] = kanjiData.map((item) => ({
    id: uuid(),
    kanji: item.kanji,
    level: item.level as KanjiItemJlptLevel,
    meanings: item.meanings ?? [],
    on_readings: item.on_readings ?? [],
    kun_readings: item.kun_readings ?? [],
  }))

  console.log('Seeding database..')

  await database.insert(kanjiTable).values(data)

  console.log('Seeding completed')
}

main()
