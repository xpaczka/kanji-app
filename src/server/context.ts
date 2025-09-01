import { TRPC_LINKS } from "#/constants/misc"
import createSupabaseClient from "#/database/client"

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>

export const createTrpcContext = async () => {
  const database = await createSupabaseClient()
  const {
    data: { user }
  } = await database.auth.getUser()

  return { ...TRPC_LINKS, database, user }
}
