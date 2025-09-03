import { Input } from "@base-ui-components/react/input"
import { ChangeEvent } from "react"
import { motion } from "motion/react"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export type KanjiItemProps = {
  kanji: string
  meanings?: string[]
  readings?: string[]
  inputValue: string
  validationState: "valid" | "invalid" | null
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (key: KeyboardEvent["key"]) => void
  nextItemHandler: () => void
}

export default function KanjiItem({
  kanji,
  readings,
  meanings,
  inputValue,
  validationState,
  onInputChange,
  onSubmit,
  nextItemHandler
}: KanjiItemProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-col items-center justify-center rounded-md border-2 border-gray-200 bg-white p-12 shadow-md">
        <div className="mb-16 text-9xl font-bold">{kanji}</div>
        <div className="mb-2 text-xl text-gray-400">
          {!!readings ? "Reading" : "Meaning"}
        </div>
        <Input
          className="rounded-md border border-gray-400 bg-white px-6 py-4 text-center text-xl"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={(e) => onSubmit(e.key)}
          disabled={!!validationState}
        />
        <motion.div
          initial={{ opacity: 0, translateY: "20px" }}
          animate={validationState ? { opacity: 100, translateY: 0 } : {}}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className={`fixed bottom-4 left-1/2 ${validationState === "valid" ? "w-[min-content]" : "min-w-lg"} -translate-x-1/2 rounded-md ${!!validationState && "border-2 px-4 py-2"} ${validationState === "valid" ? "border-green-600 bg-green-500" : "border-red-600 bg-red-500"} font-medium text-white`}
        >
          {!!validationState && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-1">
                {validationState === "valid" ? (
                  <CheckRoundedIcon fontSize="small" color="inherit" />
                ) : (
                  <CloseRoundedIcon fontSize="small" color="inherit" />
                )}
                <p className="font-semibold">
                  {validationState === "valid" ? "Correct" : "Incorrect"}
                </p>
              </div>
              {validationState === "invalid" && (
                <>
                  <p className="text-center">
                    {!!readings ? "Readings" : "Meanings"}:{" "}
                    {!!readings ? readings.join(",") : meanings!.join(", ")}
                  </p>
                  <button
                    onClick={nextItemHandler}
                    className="inline-block cursor-pointer rounded-md border-2 border-red-600 px-4 py-1 transition duration-150 hover:bg-red-600"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
