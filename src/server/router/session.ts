import { sessionTokenCookieSchema } from '#/schemas/session'
import { cookies } from 'next/headers'
import { publicProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { SessionValidationResult, validateSessionToken } from '#/lib/session'

export const SESSION_TOKEN_COOKIE_NAME = 'KANJI_SESSION'

export const sessionRouter = router({
  getCurrentSession: publicProcedure.query(
    async (): Promise<SessionValidationResult> => {
      const cookieStore = await cookies()
      const token = cookieStore.get(SESSION_TOKEN_COOKIE_NAME)?.value ?? null

      if (token === null) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { session, user } = await validateSessionToken(token)

      if (!session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      return { session, user }
    }
  ),
  setSessionTokenCookie: publicProcedure
    .input(sessionTokenCookieSchema)
    .mutation(async ({ input }): Promise<void> => {
      const { token, expiresAt } = input
      const cookieStore = await cookies()

      cookieStore.set(SESSION_TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        path: '/',
      })
    }),
  deleteSessionTokenCookie: publicProcedure.mutation(
    async (): Promise<void> => {
      const cookieStore = await cookies()

      cookieStore.set(SESSION_TOKEN_COOKIE_NAME, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/',
      })
    }
  ),
})
