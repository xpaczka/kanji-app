"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@base-ui-components/react/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "@base-ui-components/react/field"
import { Form } from "@base-ui-components/react/form"
import { useCallback } from "react"
import { signIn } from "#/actions"
import { SignInForm, SignInFormSchema } from "#/types"

export default function SignIn() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: { email: "", password: "" }
  })

  const onSubmit: SubmitHandler<SignInForm> = useCallback(async (data) => {
    await signIn(data)
  }, [])

  return (
    <Form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control
          name="email"
          render={(props) => (
            <Input
              placeholder="example@gmail.com"
              className="w-[280px] text-center"
              {...props}
            />
          )}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Field.Control
          name="password"
          render={(props) => (
            <Input
              type="password"
              placeholder={"*".repeat(16)}
              className="w-[280px] text-center"
              {...props}
            />
          )}
        />
      </Field.Root>
      <button type="submit">Sign in</button>
    </Form>
  )
}
