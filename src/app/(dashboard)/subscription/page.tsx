"use client"

import { LayoutSection } from "#/components/Layout"
import {
  SubscriptionPaymentOptionTab,
  SubscriptionPlan
} from "#/components/Subscription"
import { PaymentOption } from "#/types"
import { Tabs } from "@base-ui-components/react/tabs"
import { useState } from "react"

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
              indicator={
                <div className="rounded-md border-2 border-orange-400 bg-white p-1 text-xs text-black">
                  -20%
                </div>
              }
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
          <SubscriptionPlan paymentOption={PaymentOption.ANNUALY} />
        </Tabs.Panel>
        <Tabs.Panel value={PaymentOption.MONTHLY} className="w-full">
          <SubscriptionPlan paymentOption={PaymentOption.MONTHLY} />
        </Tabs.Panel>
      </Tabs.Root>
    </LayoutSection>
  )
}
