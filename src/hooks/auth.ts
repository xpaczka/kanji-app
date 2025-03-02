import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useAuthForm = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  // TODO: Implement functionality per usage
  const submitFormHandler = useCallback((values: z.infer<typeof schema>) => {
    console.log(values)
  }, [])

  return { form, submitForm: submitFormHandler }
}
