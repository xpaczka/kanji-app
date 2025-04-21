import { initTRPC, TRPCError } from "@trpc/server"
import { TrpcContext } from "./context"

const t = initTRPC.context<TrpcContext>().create()

export const router = t.router
export const createCallerFactory = t.createCallerFactory

export const publicProcedure = t.procedure

export const isAuthorized = (ctx: TrpcContext) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return { ...ctx, userId: ctx.userId }
}

export const protectedProcedure = t.procedure.use(async (options) => {
  const { ctx } = options
  const authorizedContext = isAuthorized(ctx)

  return options.next({ ctx: authorizedContext })
})
