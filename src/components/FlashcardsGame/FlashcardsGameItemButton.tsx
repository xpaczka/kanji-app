import { MouseEventHandler, ReactNode } from "react"

type FlashcardsGameItemButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

export default function FlashcardsGameItemButton({
  children,
  onClick
}: FlashcardsGameItemButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-md border-2 border-gray-200 px-4 py-2 font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-white"
    >
      {children}
    </button>
  )
}
