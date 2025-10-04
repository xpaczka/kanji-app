"use client"

import { JSX, ReactNode } from "react"
import { Spinner } from "./ui/spinner"
import GameSummaryButton from "./GameSummaryButton"
import { useNavigation } from "#/hooks"
import { ROUTES } from "#/constants"

type GameContainerProps<T> = {
  content: ReactNode
  isLoading: boolean
  items: T[] | undefined
  summaryComponent: JSX.Element
  gameCompleted: boolean
}

export default function GameContainer<T>({
  content,
  isLoading,
  items,
  summaryComponent,
  gameCompleted
}: GameContainerProps<T>) {
  const { navigate } = useNavigation()

  if (isLoading) {
    return (
      <Spinner size="large">
        <span className="text-sm">Loading...</span>
      </Spinner>
    )
  }

  if (gameCompleted) {
    return summaryComponent
  }

  if (!items || !items.length) {
    return (
      <div className="flex w-full flex-col items-center">
        <p className="mt-6 mb-4">Failed to load game</p>
        <GameSummaryButton
          label="Back to dashboard"
          onClick={() => {
            navigate(ROUTES.index)
          }}
        ></GameSummaryButton>
      </div>
    )
  }

  return content
}
