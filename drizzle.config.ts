import { defineConfig } from 'drizzle-kit'

const url =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_LOCAL_URL

if (!url)
  throw new Error(
    `Connection string to ${
      process.env.NODE_ENV ? 'Neon' : 'local'
    } Postgres not found.`
  )

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url },
})
