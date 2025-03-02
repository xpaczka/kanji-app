'use client'

import { Button } from '#/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '#/components/ui/form'
import { Input } from '#/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export default function Auth() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  const submitFormHandler = useCallback(
    (values: z.infer<typeof formSchema>) => {
      console.log(values)
    },
    []
  )

  return (
    <div className='grid items-center justify-items-center min-h-screen'>
      <div className='flex flex-col items-center gap-4'>
        <h1>Sign in</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitFormHandler)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit'>Sign in</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
