import { TRPC_LINKS } from "#/constants/misc"
import { getSession } from "#/lib/session"

export type Context = Awaited<ReturnType<typeof createContext>>

export const createContext = async () => {
  const session = await getSession()

  return { ...TRPC_LINKS, session }
}
