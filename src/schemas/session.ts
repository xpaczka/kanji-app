import { z } from 'zod'

export const sessionTokenCookieSchema = z.object({
  token: z.string(),
  expiresAt: z.date(),
})

export type SessionTokenCookie = z.infer<typeof sessionTokenCookieSchema>
