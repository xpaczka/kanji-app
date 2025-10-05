import { JSX, ReactNode } from "react"
import { BackToDashboard } from "../Misc"
import { Spinner } from "../Misc"

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
  if (isLoading) {
    return <Spinner />
  }

  if (gameCompleted) {
    return summaryComponent
  }

  if (!items || !items.length) {
    return <BackToDashboard content="Failed to load game" />
  }

  return content
}
