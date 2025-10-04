import { JSX, ReactNode } from "react"
import { Spinner } from "./ui/spinner"
import BackToDashboard from "./BackToDashboard"

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
    return <BackToDashboard content="Failed to load game" />
  }

  return content
}
