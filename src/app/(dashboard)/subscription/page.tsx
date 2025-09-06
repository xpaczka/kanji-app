"use client"

import { LayoutSection } from "#/components/Layout"
import {
  SubscriptionPaymentOptionTab,
  SubscriptionPlan
} from "#/components/Subscription"
import { Tabs } from "@base-ui-components/react/tabs"
import { useState } from "react"

enum PaymentOption {
  ANNUALY = "Anually",
  MONTHLY = "Monthly"
}

export default function SubscriptionPage() {
  const [paymentOption, setPaymentOption] = useState<PaymentOption>(
    PaymentOption.ANNUALY
  )

  return (
    <LayoutSection header="Subscription">
      <Tabs.Root
        value={paymentOption}
        onValueChange={(value) => setPaymentOption(value)}
        className="flex w-full flex-col items-center gap-4"
      >
        <Tabs.List className="flex gap-3">
          <Tabs.Tab value={PaymentOption.ANNUALY}>
            <SubscriptionPaymentOptionTab
              value={PaymentOption.ANNUALY}
              isActive={paymentOption === PaymentOption.ANNUALY}
            />
          </Tabs.Tab>
          <Tabs.Tab value={PaymentOption.MONTHLY}>
            <SubscriptionPaymentOptionTab
              value={PaymentOption.MONTHLY}
              isActive={paymentOption === PaymentOption.MONTHLY}
            />
          </Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value={PaymentOption.ANNUALY} className="w-full">
          <SubscriptionPlan />
        </Tabs.Panel>
        <Tabs.Panel value={PaymentOption.MONTHLY} className="w-full">
          <SubscriptionPlan />
        </Tabs.Panel>
      </Tabs.Root>
    </LayoutSection>
  )
}
