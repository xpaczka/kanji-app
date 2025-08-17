"use client"

import { Input } from "@base-ui-components/react/input"
import { ChangeEvent, useState } from "react"
import { toHiragana, toRomaji } from "wanakana"
import { motion } from "motion/react"
import similarity from "similarity"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export type LearnItemProps = {
  kanji: string
  meanings?: string[]
  readings?: string[]
  getNextItem: (value: boolean) => void
}

export default function LearnItem({
  kanji,
  readings,
  meanings,
  getNextItem
}: LearnItemProps) {
  const [value, setValue] = useState("")

  const [validationState, setValidationState] = useState<
    "valid" | "invalid" | null
  >(null)

  const isInputValid = (): boolean => {
    if (!!meanings) {
      return meanings.some(
        (meaning) =>
          similarity(meaning, value.trim(), { sensitive: false }) > 0.9
      )
    }

    if (!!readings) {
      return readings.some(
        (reading) =>
          similarity(reading, value.trim(), { sensitive: false }) > 0.9
      )
    }

    return false
  }

  const onInputSubmit = (key: KeyboardEvent["key"]) => {
    if (key !== "Enter") return

    const isValid = isInputValid()
    setValidationState(isValid ? "valid" : "invalid")

    if (isValid) {
      setTimeout(() => {
        setValidationState(null)
        getNextItem(true)
        setValue("")
      }, 1000)
    }
  }

  const nextItemHandler = () => {
    setValidationState(null)
    getNextItem(false)
    setValue("")
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (!!readings) {
      const parsedValue = toRomaji(value)
      setValue(toHiragana(parsedValue))
      return
    }

    if (!!meanings) {
      setValue(value)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="relative inline-flex aspect-square flex-col items-center justify-center rounded-md border-2 border-gray-200 bg-white p-12 shadow-md">
        <div className="mb-16 text-9xl font-bold">{kanji}</div>
        <div className="mb-2 text-xl text-gray-400">
          {!!readings ? "Reading" : "Meaning"}
        </div>
        <Input
          className="rounded-md border border-gray-400 bg-white px-6 py-4 text-center text-xl"
          value={value}
          onChange={onInputChange}
          onKeyDown={(e) => onInputSubmit(e.key)}
          disabled={!!validationState}
        />
        <motion.div
          initial={{ opacity: 0, translateY: "-20px" }}
          animate={validationState ? { opacity: 100, translateY: 0 } : {}}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className={`absolute top-full left-1/2 mt-4 w-full -translate-x-1/2 rounded-md border-2 ${validationState === "valid" ? "border-green-600 bg-green-500" : "border-red-600 bg-red-500"} px-4 py-2 font-medium text-white`}
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
