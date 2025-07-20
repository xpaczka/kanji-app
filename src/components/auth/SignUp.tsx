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
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>{`${field.name[0].toUpperCase()}${field.name.slice(
                1
              )}`}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your username"
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
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  )
}
