import { PaymentOption } from "#/types"
import SubscriptionPlanItem, {
  SubscriptionPlanItemProps
} from "./SubscriptionPlanItem"

type SubscriptionPlanProps = {
  paymentOption: PaymentOption
}

const SUBSCRIPTION_PLANS: Omit<SubscriptionPlanItemProps, "paymentOption">[] = [
  {
    header: "Basic",
    description:
      "Get started with the fundamentals of kanji learning at no cost.",
    price: 0,
    isCurrentPlan: true
  },
  {
    header: "Pro",
    description: "Unlock advanced features to accelerate your kanji mastery.",
    price: 4.99
  },
  {
    header: "Forever",
    description:
      "Pay once and enjoy lifetime access to the complete kanji experience.",
    price: 99.99,
    oneTime: true
  }
]

export default function SubscriptionPlan({
  paymentOption
}: SubscriptionPlanProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      {SUBSCRIPTION_PLANS.map(
        ({ header, description, price, oneTime, isCurrentPlan }) => {
          let subscriptionPrice

          if (oneTime) {
            subscriptionPrice = price
          } else {
            subscriptionPrice =
              paymentOption === PaymentOption.ANNUALY ? price * 0.8 * 12 : price
          }

          return (
            <SubscriptionPlanItem
              key={header}
              header={header}
              description={description}
              price={subscriptionPrice}
              paymentOption={paymentOption}
              oneTime={oneTime}
              isCurrentPlan={isCurrentPlan}
            />
          )
        }
      )}
    </div>
  )
}
