import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "#/server"
import { ROUTES } from "#/constants/router"
import { createTrpcContext } from "#/server/context"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: ROUTES.apiTrpc,
    req,
    router: appRouter,
    createContext: createTrpcContext
  })

export { handler as GET, handler as POST }
