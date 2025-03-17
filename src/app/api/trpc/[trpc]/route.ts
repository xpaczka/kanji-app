import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '#/server'
import { ROUTES } from '#/constants/router'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: ROUTES.apiTrpc,
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
