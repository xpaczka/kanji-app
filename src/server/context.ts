import { TRPC_LINKS } from "#/constants/misc"
import createSupabaseServer from "#/database/server"

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>

export const createTrpcContext = async () => {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  return { ...TRPC_LINKS, userId: data.user?.id || null }
}
