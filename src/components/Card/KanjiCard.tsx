import { Database, LearnStage, LearnStageColor } from "#/types"
import { toHiragana } from "wanakana"
import MotionCard from "./MotionCard"
import Modal from "../Modal"

type KanjiCardProps = {
  item: Database["public"]["Tables"]["kanji"]["Row"]
}

const formatReadings = (items: string[]) => [
  ...new Set(
    items.map((item) => toHiragana(item.split(".")[0].replaceAll("-", "")))
  )
]

export default async function KanjiCard({ item }: KanjiCardProps) {
  const { kanji, level, kun_readings, on_readings, meanings } = item

  const kunReadings = formatReadings(kun_readings)
  const onReadings = formatReadings(on_readings)

  const kanjiMeaning = meanings
    .map((value) => (isNaN(Number(value)) ? value : null))
    .filter((value) => value !== null)

  return (
    <Modal
      trigger={
        <MotionCard className="flex flex-col items-center justify-center p-8 sm:aspect-square">
          <div className="mb-4 text-5xl font-bold">{kanji}</div>
          <p className="text-sm text-gray-400">{level.toUpperCase()}</p>
        </MotionCard>
      }
    >
      <div className="p-8">
        <div className="mb-6 text-center text-xl font-medium">
          Kanji Details
        </div>
        <div className="mb-6 flex gap-4">
          <div
            className={`${LearnStageColor.Stage1} inline-flex aspect-square h-28 w-28 items-center justify-center rounded-md border-2 border-gray-200 p-4 text-5xl font-bold`}
          >
            {kanji}
          </div>
          <div className="flex flex-col gap-2">
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-400">Level</div>
            <div>{level.toUpperCase()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Stage</div>
            <div>{LearnStage.Stage1}</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
