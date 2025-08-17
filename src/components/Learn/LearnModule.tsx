"use client"

import { useState } from "react"
import LearnItem, { LearnItemProps } from "./LearnItem"
import { useNavigation } from "#/hooks"
import { ROUTES } from "#/constants/router"

type LearnModuleProps = {
  items: Omit<LearnItemProps, "getNextItem">[]
}

export default function LearnModule({ items }: LearnModuleProps) {
  const [learnItems, setLearnItems] = useState(items)

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

  return (
    <LearnItem
      kanji={learnItems[0].kanji}
      meanings={learnItems[0].meanings}
      readings={learnItems[0].readings}
      getNextItem={getNextItem}
    />
  )
}
