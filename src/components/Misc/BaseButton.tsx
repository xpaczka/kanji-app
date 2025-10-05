import { ButtonHTMLAttributes } from "react"
import { cn } from "#/utils"

type BaseButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
}

export default function BaseButton({ label, className, ...props }: BaseButton) {
  return (
    <button
      className={cn(
        "cursor-pointer rounded-md border-2 border-gray-200 px-4 py-2 font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-white",
        className
      )}
      {...props}
    >
      {label}
    </button>
  )
}
