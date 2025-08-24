import { Database } from "#/types"
import { KanjiCard } from "../Card"
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded"
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded"

type LearnIntroductionProps = {
  item: Database["public"]["Tables"]["kanji"]["Row"]
  currentIndex: number
  getNextItem: () => void
  getPreviousItem: () => void
}

export default function LearnIntroduction({
  item,
  currentIndex,
  getNextItem,
  getPreviousItem
}: LearnIntroductionProps) {
  return (
    <div>
      <KanjiCard item={item} isLearnCard />
      <div className="mt-6 flex gap-3">
        {currentIndex > 0 && (
          <button
            className="flex cursor-pointer items-center gap-1 rounded-md border-2 border-gray-200 py-2 pr-4 pl-2 text-center font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-gray-50"
            onClick={getPreviousItem}
          >
            <KeyboardArrowLeftRoundedIcon color="inherit" />
            <p className="text-lg font-medium">Previous</p>
          </button>
        )}
        <button
          className="flex cursor-pointer items-center gap-1 rounded-md border-2 border-gray-200 py-2 pr-2 pl-4 text-center font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-gray-50"
          onClick={getNextItem}
        >
          <p className="text-lg font-medium">Next</p>
          <KeyboardArrowRightRoundedIcon color="inherit" />
        </button>
      </div>
    </div>
  )
}
