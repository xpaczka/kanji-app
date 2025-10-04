"use client"

import { ROUTES } from "#/constants/router"
import { useNavigation } from "#/hooks"
import DashboardActionItem from "../dashboard/DashboardActionItem"

export default function FlashcardsButton() {
  const { navigate } = useNavigation()

  return (
    <DashboardActionItem
      title="Flashcards"
      onClick={() => navigate(ROUTES.playFlashcards)}
    >
      Improve your Kanji skills <br />
      with the help of flashcards
    </DashboardActionItem>
  )
}
