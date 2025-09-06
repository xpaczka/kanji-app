type SubscriptionPaymentOptionTabProps = {
  value: string
  isActive: boolean
}

export default function SubscriptionPaymentOptionTab({
  value,
  isActive
}: SubscriptionPaymentOptionTabProps) {
  return (
    <div
      className={`w-28 cursor-pointer rounded-2xl border-2 border-orange-400 ${isActive ? "bg-orange-400 text-white" : "bg-white text-black"} px-4 py-2 font-medium transition duration-150 ease-in-out hover:bg-orange-400 hover:text-white`}
    >
      {value}
    </div>
  )
}
