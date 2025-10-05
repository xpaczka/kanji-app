"use client"

import { ROUTES } from "#/constants"
import { useNavigation } from "#/hooks"
import { DatabaseGetReviewItems } from "#/types"
import { useCallback, useState } from "react"
import ReviewItem from "./ReviewItem"
import { BackToDashboard } from "../Misc"
import { getItemsForReview } from "#/utils"

type ReviewModuleProps = {
  items: DatabaseGetReviewItems
}

export default function ReviewModule({ items }: ReviewModuleProps) {
  const [reviewItems, setReviewItems] = useState(getItemsForReview(items))
  const [kanjiMap, setKanjiMap] = useState(new Map<string, boolean>())

  const { navigate } = useNavigation()

  const getNextItem = useCallback(
    (value: boolean) => {
      if (reviewItems.length === 1) {
        navigate(ROUTES.index)
        return
      }

      const item = reviewItems[0]

      if (value) {
        setReviewItems(reviewItems.slice(1))
      } else {
        setReviewItems([...reviewItems.slice(1), item])
      }
    },
    [reviewItems, navigate]
  )

  if (!items || !items.length) {
    return <BackToDashboard content="Failed to load review module" />
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-lg font-semibold">
        {items.length * 2 - reviewItems.length + 1} / {items.length * 2}
      </div>
      <ReviewItem
        kanjiId={reviewItems[0].kanjiId}
        userKanjiUuid={reviewItems[0].userKanjiUuid}
        kanji={reviewItems[0].kanji}
        meanings={reviewItems[0].meanings}
        readings={reviewItems[0].readings}
        stage={reviewItems[0].stage}
        kanjiMap={kanjiMap}
        setKanjiMap={setKanjiMap}
        getNextItem={getNextItem}
      />
    </div>
  )
}
