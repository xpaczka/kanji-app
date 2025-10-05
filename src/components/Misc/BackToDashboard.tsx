"use client"

import { ROUTES } from "#/constants"
import { useNavigation } from "#/hooks"
import { BaseButton } from "../Misc"

type BackToDashboardProps = {
  content: string
}

export default function BackToDashboard({ content }: BackToDashboardProps) {
  const { navigate } = useNavigation()

  return (
    <div className="flex w-full flex-col items-center">
      <p className="mt-6 mb-4">{content}</p>
      <BaseButton
        label="Back to dashboard"
        onClick={() => {
          navigate(ROUTES.index)
        }}
      />
    </div>
  )
}
