import { Database } from "#/types"
import MotionCard from "./MotionCard"
import { Modal } from "../Modal"
import { formatReadings } from "#/utils"
import { LEARN_STAGE_COLORS } from "#/constants"
import { resolveStageName } from "#/utils"
import { useMemo } from "react"

type KanjiCardProps = {
  item: Database["public"]["Functions"]["get_kanji_with_stage"]["Returns"][0]
  isLearnCard?: boolean
}

export default function KanjiCard({
  item,
  isLearnCard = false
}: KanjiCardProps) {
  const { kanji, level, kun_readings, on_readings, meanings, kanji_stage } =
    item

  const kunReadings = formatReadings(kun_readings)
  const onReadings = formatReadings(on_readings)

  const kanjiMeaning = meanings
    .map((value) => (isNaN(Number(value)) ? value : null))
    .filter((value) => value !== null)

  const stageName = resolveStageName(kanji_stage)

  const kanjiCardColor = useMemo(() => {
    if (isLearnCard) return "bg-white"

    return stageName ? LEARN_STAGE_COLORS[stageName] : "bg-white"
  }, [isLearnCard, stageName])

  const content = (
    <div className={isLearnCard ? "text-center" : "p-8"}>
      {!isLearnCard && (
        <div className="mb-6 text-center text-xl font-medium">
          Kanji Details
        </div>
      )}
      <div
        className={`mb-6 flex ${isLearnCard ? "flex-col items-center" : "flex-row"} gap-4`}
      >
        <div
          className={`${kanjiCardColor} inline-flex aspect-square h-28 w-28 items-center justify-center rounded-md border-2 border-gray-200 p-4 text-5xl font-bold`}
        >
          {kanji}
        </div>
        <div className={`flex ${isLearnCard ? "gap-6" : "flex-col gap-2"}`}>
          {kunReadings.length > 0 && (
            <div>
              <div className="text-sm text-gray-400">Kun’yomi</div>
              <div className="font-bold">{kunReadings.join(", ")}</div>
            </div>
          )}
          {onReadings.length > 0 && (
            <div>
              <div className="text-sm text-gray-400">On’yomi</div>
              <div className="font-bold">{onReadings.join(", ")}</div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-6">
        <div className="text-sm text-gray-400">
          {meanings.length > 1 ? "Meanings" : "Meaning"}
        </div>
        <div className="font-medium">{kanjiMeaning.join(", ")}</div>
      </div>
      <div className={`${isLearnCard ? "" : "grid"} grid-cols-2 gap-4`}>
        <div>
          <div className="text-xs text-gray-400">Level</div>
          <div>{level.toUpperCase()}</div>
        </div>
        {!isLearnCard && stageName && (
          <div>
            <div className="text-xs text-gray-400">Stage</div>
            <div>{stageName}</div>
          </div>
        )}
      </div>
    </div>
  )

  if (isLearnCard) return content

  return (
    <Modal
      trigger={
        <MotionCard
          className={`${kanjiCardColor} flex flex-col items-center justify-center p-8 sm:aspect-square`}
        >
          <div className="mb-4 text-5xl font-bold">{kanji}</div>
          <p
            className={`text-sm ${stageName ? "text-gray-700" : "text-gray-400"}`}
          >
            {level.toUpperCase()}
          </p>
        </MotionCard>
      }
    >
      {content}
    </Modal>
  )
}
