import SubscriptionPlanItem from "./SubscriptionPlanItem"

export default function SubscriptionPlan() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <SubscriptionPlanItem />
      <SubscriptionPlanItem />
      <SubscriptionPlanItem />
    </div>
  )
}
