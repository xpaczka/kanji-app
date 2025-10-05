import { DatabaseGetLearnItems } from "#/types"
import { shuffle, formatReadings } from "../utils"

export const getItemsForLearn = (items: DatabaseGetLearnItems) =>
  shuffle(
    items.flatMap(({ id, kanji, on_readings, meanings }) => [
      ...(meanings.length > 0 ? [{ kanjiId: id, kanji, meanings }] : []),
      ...(on_readings.length > 0
        ? [{ kanjiId: id, kanji, readings: formatReadings(on_readings) }]
        : [])
    ])
  )
