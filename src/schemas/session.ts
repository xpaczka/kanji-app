import { z } from 'zod'

export const createSessionSchema = z.object({
  token: z.string(),
  userId: z.number(),
})
