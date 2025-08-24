"use client"

import { useState } from "react"
import LearnItem from "./LearnItem"
import { useNavigation } from "#/hooks"
import { ROUTES } from "#/constants/router"
import LearnIntroduction from "./LearnIntroduction"
import { getItemsForLearnOrReview } from "#/lib/utils"
import { Database } from "#/types"

type LearnModuleProps = {
  items: Database["public"]["Tables"]["kanji"]["Row"][]
}

export default function LearnModule({ items }: LearnModuleProps) {
  const [introductionIndex, setIntroductionIndex] = useState(0)
  const [learnItems, setLearnItems] = useState(getItemsForLearnOrReview(items))

  const { navigate } = useNavigation()

  const getNextItem = (value: boolean) => {
    if (learnItems.length === 1) {
      navigate(ROUTES.index)
      return
    }

    const item = learnItems[0]

    if (value) {
      setLearnItems(learnItems.slice(1))
    } else {
      setLearnItems([...learnItems.slice(1), item])
    }
  }

  if (introductionIndex < items.length) {
    return (
      <LearnIntroduction
        item={items[introductionIndex]}
        currentIndex={introductionIndex}
        getNextItem={() => setIntroductionIndex((prev) => prev + 1)}
        getPreviousItem={() => setIntroductionIndex((prev) => prev - 1)}
      />
    )
  }

  return (
    <LearnItem
      kanjiId={learnItems[0].kanjiId}
      kanji={learnItems[0].kanji}
      meanings={learnItems[0].meanings}
      readings={learnItems[0].readings}
      getNextItem={getNextItem}
    />
  )
}
