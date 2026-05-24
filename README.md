# Kanji App

Learn Japanese kanji the fun way — built with Next.js, tRPC, and Supabase.

## Features

- **Authentication** — sign up / sign in via Supabase Auth; all study routes are protected.
- **Learn** — guided sessions that introduce new kanji (5 at a time).
- **Review** — spaced repetition (SRS) sessions that surface kanji based on your performance. See [docs/srs.md](docs/srs.md) for a full breakdown of the 10-stage system.
- **Kanji browser** — browse all JLPT N1–N5 kanji with meanings and readings.
- **Play** — two games to reinforce memory:
  - _Memo_ — match kanji pairs (8 kanji per round).
  - _Flashcards_ — quiz yourself on meanings and readings (10 kanji per round).

## Tech stack

| Layer | Libraries |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| API | tRPC 11, TanStack React Query |
| Database / Auth | Supabase (Postgres + Auth), `@supabase/ssr` |
| UI / Styling | MUI 6 + Emotion, Tailwind CSS 4, Motion |
| Forms | react-hook-form, Zod |
| Japanese | wanakana (kana conversion), similarity (answer matching) |
| Utilities | Luxon, react-confetti |
| Tooling | Bun, ESLint, Prettier |

## Getting started

### Prerequisites

- [Bun](https://bun.sh) (package manager and runtime)
- [Docker](https://www.docker.com) (required for local Supabase)
- Supabase CLI — available via `bunx supabase` (no global install needed)

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then fill in `.env`:

```
DATABASE_URL=   # Supabase project URL
DATABASE_KEY=   # Supabase anon key
```

For local development, start Supabase first and get the values from `bunx supabase status`.

### 3. Set up the database

Start the local Supabase stack:

```bash
bunx supabase start
```

Seed kanji data, reset the database schema, and regenerate TypeScript types:

```bash
bun run supabase:reload
```

This command generates `supabase/seed.sql` from `scripts/data.json`, resets the local DB, and regenerates `src/types/supabase.ts`.

### 4. Run the dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up for an account and start learning.

## Available scripts

| Script | Description |
|---|---|
| `bun run dev` | Start the Next.js development server |
| `bun run build` | Build the app for production |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |
| `bun run prettier:write` | Auto-format all JS/TS/JSX/TSX files |
| `bun run prettier:check` | Check formatting without writing |
| `bun run format:check` | Run lint + prettier check (used in CI) |
| `bun run supabase:migrations:create` | Create a new Supabase migration file |
| `bun run supabase:reload` | Regenerate seed SQL, reset local DB, and refresh TypeScript types |

## Project structure

```
src/
  app/          # Next.js App Router pages and tRPC HTTP handler
  components/   # UI components (auth, kanji, learn, review, games, layout)
  server/       # tRPC router definitions (learn, review, kanji, flashcards, memo-game)
  actions/      # Next.js Server Actions (auth: sign-in, sign-up, sign-out)
  database/     # Supabase client, session middleware, seed script
  constants/    # App-wide constants (routes, game config, SRS config)
  hooks/        # Custom React hooks
  utils/        # Pure utility functions
  types/        # TypeScript types including generated Supabase types
supabase/
  migrations/   # SQL migration files
  seed.sql      # Generated kanji seed data (do not edit by hand)
scripts/
  scrape_kanji.py   # Python scraper — fetches JLPT kanji from jisho.org
  main.py           # Entry point — runs the scraper and writes data.json
  data.json         # Scraped kanji data (source of truth for the seed)
docs/
  srs.md        # Spaced repetition system specification
```

## Kanji data pipeline

Kanji data (JLPT N1–N5) is scraped from [jisho.org](https://jisho.org) using the Python scripts in `scripts/`. The output (`scripts/data.json`) is the source for the database seed. Running `bun run supabase:reload` converts it to `supabase/seed.sql` via `src/database/seed.ts` and loads it into the local database. You only need to re-run the scraper if you want to refresh the kanji data.

To run the scraper (requires Python 3 + `requests` + `beautifulsoup4`):

```bash
cd scripts && python main.py
```
