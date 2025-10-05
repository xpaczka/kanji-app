"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@base-ui-components/react/form"
import { useCallback } from "react"
import { signUp } from "#/actions"
import {
  EmailSchema,
  PasswordSchema,
  SignUpForm,
  SignUpFormSchema,
  UsernameSchema
} from "#/types"
import AuthorizationInput from "./AuthorizationInput"

enum SignUpField {
  EMAIL = "email",
  USERNAME = "username",
  PASSWORD = "password"
}

export default function SignUp() {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", username: "", password: "" }
  })

  const onSubmit: SubmitHandler<SignUpForm> = useCallback(async (data) => {
    await signUp(data)
  }, [])

  return (
    <Form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
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
      <button type="submit">Sign up</button>
    </Form>
  )
}
