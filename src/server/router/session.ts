import { publicProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const sessionRouter = router({
  setSessionTokenCookie: publicProcedure.mutation(
    async (): Promise<{ token: string }> => {
      const response = await fetch(`${baseUrl}/api/session`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }

      const { token } = await response.json()

      return { token }
    }
  ),
  deleteSessionTokenCookie: publicProcedure.mutation(
    async (): Promise<void> => {
      const response = await fetch(`${baseUrl}/api/session`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
    }
  ),
})
