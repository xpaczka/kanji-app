"use client"

import { Field } from "@base-ui-components/react/field"
import { Input } from "@base-ui-components/react/input"
import { useCallback, useState } from "react"
import { z } from "zod"
import AuthorizationError from "./AuthorizationError"

type AuthorizationInputProps = Input.Props & {
  label: string
  schema: z.ZodString
}

export default function AuthorizationInput({
  label,
  schema,
  onBlur,
  ...props
}: AuthorizationInputProps) {
  const [error, setError] = useState<string | null>(null)

  const validateInput = useCallback(
    (value: string) => {
      if (!value) {
        setError(null)
        return
      }

      const parsedValue = value.trim()
      const { error: errorValue } = schema.safeParse(parsedValue)

      setError(errorValue?.issues[0]?.message ?? null)
    },
    [schema]
  )

  return (
    <Field.Root className="flex w-full flex-col items-center gap-2">
      <Field.Label className="text-sm text-gray-600">{label}</Field.Label>
      <Field.Control
        className="text-md w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-center"
        onBlur={(e) => {
          onBlur?.(e)
          validateInput(e.target.value)
        }}
        {...props}
      />
      <Field.Error match render={<AuthorizationError error={error} />} />
    </Field.Root>
  )
}
