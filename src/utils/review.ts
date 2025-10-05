import { DatabaseGetReviewItems } from "#/types"
import { shuffle, formatReadings } from "../utils"

export const getItemsForReview = (items: DatabaseGetReviewItems) =>
  shuffle(
    items.flatMap(
      ({ id, kanji, on_readings, meanings, kanji_stage, user_kanji_uuid }) => [
        ...(meanings.length > 0
          ? [
              {
                kanjiId: id,
                kanji,
                meanings,
                stage: kanji_stage,
                userKanjiUuid: user_kanji_uuid
              }
            ]
          : []),
        ...(on_readings.length > 0
          ? [
              {
                kanjiId: id,
                kanji,
                readings: formatReadings(on_readings),
                stage: kanji_stage,
                userKanjiUuid: user_kanji_uuid
              }
            ]
          : [])
      ]
    )
  )
