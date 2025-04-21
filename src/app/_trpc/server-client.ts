import { appRouter } from "#/server"
import { createCallerFactory } from "#/server/trpc"
import { createContext } from "#/server/context"

export const createServerClient = async () => {
  const context = await createContext()

  return createCallerFactory(appRouter)(context)
}
