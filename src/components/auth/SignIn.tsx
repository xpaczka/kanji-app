"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Button } from "../ui/button"
import { useCallback } from "react"
import { SignInForm, signInFormSchema } from "#/schemas/auth"
import { signIn } from "#/actions"

export default function SignIn() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "" }
  })

  const onSubmit: SubmitHandler<SignInForm> = useCallback(async (data) => {
    await signIn(data)
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>{`${field.name[0].toUpperCase()}${field.name.slice(
                1
              )}`}</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  className="w-[280px] text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>{`${field.name[0].toUpperCase()}${field.name.slice(
                1
              )}`}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={"*".repeat(16)}
                  {...field}
                  className="w-[280px] text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  )
}
