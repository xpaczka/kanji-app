'use client'

import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

type SignUpForm = z.infer<typeof signupFormSchema>

export const signupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Must contain at least one special character.',
    })
    .trim(),
})

export default function SignUpForm() {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { email: '', username: '', password: '' },
  })

  const onSubmit = useCallback((values: SignUpForm) => {
    const { email, username, password } = values

    // Validate sign up form fields
    const validatedFields = signupFormSchema.safeParse({
      email,
      username,
      password,
    })

    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors }
    }

    // TODO: Prepare data for insertion into database

    // TODO: Insert user into database

    // TODO: Create user session

    // TODO: Redirect user to dashboard
  }, [])

  return (
    <Card className='p-12'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='gap-4 flex flex-col items-center'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormLabel>{`${field.name[0].toUpperCase()}${field.name.slice(
                  1
                )}`}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@gmail.com'
                    {...field}
                    className='text-center w-[280px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormLabel>{`${field.name[0].toUpperCase()}${field.name.slice(
                  1
                )}`}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your username'
                    {...field}
                    className='text-center w-[280px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormLabel>{`${field.name[0].toUpperCase()}${field.name.slice(
                  1
                )}`}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'*'.repeat(16)}
                    {...field}
                    className='text-center w-[280px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Sign up</Button>
        </form>
      </Form>
    </Card>
  )
}
