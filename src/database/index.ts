import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

const databaseConnectionUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_LOCAL_URL

const pool = new Pool({ connectionString: databaseConnectionUrl })

export const database = drizzle(pool)
