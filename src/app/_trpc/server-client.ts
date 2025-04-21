import { appRouter } from "#/server"
import { createCallerFactory } from "#/server/trpc"
import { createTrpcContext } from "#/server/context"

export const createServerClient = async () => {
  const context = await createTrpcContext()

  return createCallerFactory(appRouter)(context)
}
