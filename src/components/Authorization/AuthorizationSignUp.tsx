"use client"

import { Form } from "@base-ui-components/react/form"
import { FormEvent, useState } from "react"
import { signUp } from "#/actions"
import { EmailSchema, PasswordSchema, UsernameSchema } from "#/types"
import AuthorizationInput from "./AuthorizationInput"
import { BaseButton } from "../Misc"
import AuthorizationError from "./AuthorizationError"

enum SignUpField {
  EMAIL = "email",
  USERNAME = "username",
  PASSWORD = "password"
}

export default function SignUp() {
  const [error, setError] = useState<string | null>(null)

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get(SignUpField.EMAIL) as string
    const username = formData.get(SignUpField.USERNAME) as string
    const password = formData.get(SignUpField.PASSWORD) as string

    const { error } = await signUp({ email, username, password })
    setError(error)
  }

  return (
    <Form onSubmit={submitForm} className="flex flex-col items-center gap-4">
      <AuthorizationInput
        label="Email"
        placeholder="example@gmail.com"
        name={SignUpField.EMAIL}
        schema={EmailSchema}
      />
      <AuthorizationInput
        label="Username"
        placeholder="Your username"
        name={SignUpField.USERNAME}
        schema={UsernameSchema}
      />
      <AuthorizationInput
        label="Password"
        type="password"
        placeholder={"*".repeat(16)}
        name={SignUpField.PASSWORD}
        schema={PasswordSchema}
      />
      <AuthorizationError error={error} />
      <BaseButton type="submit" label="Sign up" />
    </Form>
  )
}
