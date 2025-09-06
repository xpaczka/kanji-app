import { ReactNode } from "react"

type SubscriptionPaymentOptionTabProps = {
  value: string
  isActive: boolean
  indicator?: ReactNode
}

export default function SubscriptionPaymentOptionTab({
  value,
  isActive,
  indicator
}: SubscriptionPaymentOptionTabProps) {
  return (
    <div
      className={`relative w-28 cursor-pointer rounded-2xl border-2 border-orange-400 ${isActive ? "bg-orange-400 text-white" : "bg-white text-black"} px-4 py-2 font-medium transition duration-150 ease-in-out hover:bg-orange-400 hover:text-white`}
    >
      {value}
      <div className="absolute right-[80%] bottom-[80%]">{indicator}</div>
    </div>
  )
}
