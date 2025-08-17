import { clsx, type ClassValue } from "clsx"
import { DateTime } from "luxon"
import { twMerge } from "tailwind-merge"
import { toHiragana } from "wanakana"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const shuffle = <T>(items: T[]): T[] => {
  const newItems = [...items]

  for (let i = newItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newItems[i], newItems[j]] = [newItems[j], newItems[i]]
  }

  return newItems
}

export const calculateTimeDifferenceToFormat = (
  startTime: DateTime | null,
  endTime: DateTime | null
) => {
  if (!startTime || !endTime) return "0:00"

  const duration = endTime.diff(startTime, ["minutes", "seconds"])

  const minutes = duration.minutes.toFixed(0)
  const seconds = duration.seconds.toFixed(0).padStart(2, "0")

  return `${minutes}:${seconds}`
}

export const formatReadings = (items: string[]) => [
  ...new Set(
    items.map((item) => toHiragana(item.split(".")[0].replaceAll("-", "")))
  )
]
