"use client"

import { Form } from "@base-ui-components/react/form"
import { FormEvent, useState } from "react"
import { signIn } from "#/actions"
import AuthorizationInput from "./AuthorizationInput"
import { BaseButton } from "../Misc"
import { EmailSchema, PasswordSchema } from "#/types"
import AuthorizationError from "./AuthorizationError"

enum SignInField {
  EMAIL = "email",
  PASSWORD = "password"
}

export default function SignIn() {
  const [error, setError] = useState<string | null>(null)

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get(SignInField.EMAIL) as string
    const password = formData.get(SignInField.PASSWORD) as string

    const { error } = await signIn({ email, password })
    setError(error)
  }

  return (
    <Form onSubmit={submitForm} className="flex flex-col items-center gap-4">
      <AuthorizationInput
        label="Email"
        placeholder="example@gmail.com"
        name={SignInField.EMAIL}
        schema={EmailSchema}
      />
      <AuthorizationInput
        label="Password"
        placeholder={"*".repeat(16)}
        name={SignInField.PASSWORD}
        type="password"
        schema={PasswordSchema}
      />
      <AuthorizationError error={error} />
      <BaseButton type="submit" label="Sign in" />
    </Form>
  )
}
