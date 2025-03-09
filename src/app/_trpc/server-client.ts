import { appRouter } from '#/server'
import { TRPC_LINKS } from '#/constants/misc'

export const serverClient = appRouter.createCaller({
  links: TRPC_LINKS,
})
