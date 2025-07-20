import fs from "fs"
import path from "path"

// Retrieve the command-line arguments
const args = process.argv.slice(2)
const argsMap = new Map()

for (let i = 0; i < args.length; i += 2) {
  argsMap.set(args[i], args[i + 1])
}

const kanjiDataPath = argsMap.get("--data-path")
const outputPath = path.resolve(process.cwd(), "supabase/seed.sql")

// Escape single quotes in strings
const escape = (str: string) => str.replace(/'/g, "''")

const arrToPgArray = (arr: string[]) =>
  "{" + arr.map((s) => `"${escape(s)}"`).join(",") + "}"

const main = async () => {
  if (!kanjiDataPath) {
    throw Error("Kanji data path not defined")
  }

  const kanjiData = JSON.parse(
    fs.readFileSync(kanjiDataPath, { encoding: "utf-8" })
  ).data

  if (!kanjiData || kanjiData.length === 0) {
    throw Error("No data to be seeded")
  }

  let sql = "-- Kanji seed data\n"

  for (const item of kanjiData) {
    sql += `INSERT INTO kanji (kanji, level, meanings, on_readings, kun_readings) VALUES ('${escape(
      item.kanji
    )}', '${escape(item.level)}', '${arrToPgArray(
      item.meanings ?? []
    )}', '${arrToPgArray(item.on_readings ?? [])}', '${arrToPgArray(
      item.kun_readings ?? []
    )}');\n`
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, sql, { encoding: "utf-8" })

  console.log(`Seed SQL written to ${outputPath}`)
}

main()
