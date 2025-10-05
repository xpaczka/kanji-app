"use client"

import { useCallback, useState } from "react"
import LearnItem from "./LearnItem"
import { useNavigation } from "#/hooks"
import { ROUTES } from "#/constants/router"
import LearnIntroduction from "./LearnIntroduction"
import { DatabaseGetLearnItems } from "#/types"
import { BackToDashboard } from "../Misc"
import { getItemsForLearn } from "#/utils"

type LearnModuleProps = {
  items: DatabaseGetLearnItems
}

export default function LearnModule({ items }: LearnModuleProps) {
  const [introductionIndex, setIntroductionIndex] = useState(0)
  const [learnItems, setLearnItems] = useState(getItemsForLearn(items))
  const [kanjiMap, setKanjiMap] = useState(new Map<string, boolean>())

  const { navigate } = useNavigation()

  const getNextItem = useCallback(
    (value: boolean) => {
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
    },
    [learnItems, navigate]
  )

  if (!items || !items.length) {
    return <BackToDashboard content="Failed to load learn module" />
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
    <div className="flex flex-col items-center">
      <div className="mb-2 text-lg font-semibold">
        {items.length * 2 - learnItems.length + 1} / {items.length * 2}
      </div>
      <LearnItem
        kanjiId={learnItems[0].kanjiId}
        kanji={learnItems[0].kanji}
        meanings={learnItems[0].meanings}
        readings={learnItems[0].readings}
        kanjiMap={kanjiMap}
        setKanjiMap={setKanjiMap}
        getNextItem={getNextItem}
      />
    </div>
  )
}
