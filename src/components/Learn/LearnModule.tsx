"use client"

import { useState } from "react"
import LearnItem, { LearnItemProps } from "./LearnItem"

type LearnModuleProps = {
  items: Omit<LearnItemProps, "getNextItem">[]
}

export default function LearnModule({ items }: LearnModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const getNextItem = () => {
    if (currentIndex === items.length) return

    setCurrentIndex((prev) => prev + 1)
  }

  return (
    <LearnItem
      kanji={items[currentIndex].kanji}
      meanings={items[currentIndex].meanings}
      readings={items[currentIndex].readings}
      getNextItem={getNextItem}
    />
  )
}
