"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@base-ui-components/react/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "@base-ui-components/react/field"
import { Form } from "@base-ui-components/react/form"
import { useCallback } from "react"
import { SignUpForm, signUpFormSchema } from "#/schemas/auth"
import { signUp } from "#/actions"

export default function SignUp() {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
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
        <Field.Label>Username</Field.Label>
        <Field.Control
          name="username"
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
              placeholder="Your username"
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
