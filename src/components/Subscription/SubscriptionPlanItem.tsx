import { PaymentOption } from "#/types"

export type SubscriptionPlanItemProps = {
  header: string
  description: string
  price: number
  oneTime?: boolean
  paymentOption: PaymentOption
  isCurrentPlan?: boolean
}

export default function SubscriptionPlanItem({
  header,
  description,
  price,
  paymentOption,
  oneTime,
  isCurrentPlan
}: SubscriptionPlanItemProps) {
  return (
    <div className="flex w-full flex-col rounded-lg border-2 border-orange-400 bg-white px-6 py-8">
      <div className="flex-1">
        <div className="text-xl font-medium">{header}</div>
        <div className="my-6 text-sm">
          <span className="text-3xl font-semibold">${price.toFixed(2)}</span>{" "}
          {oneTime
            ? ""
            : `/ ${paymentOption === PaymentOption.ANNUALY ? "Year" : "Month"}`}
        </div>
        <p className="mb-4 text-xs text-gray-500">{description}</p>
        <ul className="mb-6">
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
        </ul>
      </div>
      <button
        className={`w-full ${isCurrentPlan ? "text-gray-400" : "cursor-pointer border-orange-400 bg-orange-400 text-white"} rounded-full border-2 px-4 py-2 text-lg font-semibold`}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? "Current plan" : "Continue"}
      </button>
    </div>
  )
}
