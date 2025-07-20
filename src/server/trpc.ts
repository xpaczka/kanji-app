import { initTRPC, TRPCError } from "@trpc/server"
import { TrpcContext } from "./context"
import createSupabaseClient from "#/database/client"

const t = initTRPC.context<TrpcContext>().create()

export const router = t.router
export const createCallerFactory = t.createCallerFactory

export const publicProcedure = t.procedure

export const isAuthorized = async (ctx: TrpcContext) => {
  const supabase = await createSupabaseClient()
  const { data: session } = await supabase.auth.getSession()

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return ctx
}

export const protectedProcedure = t.procedure.use(async (options) => {
  const { ctx } = options
  const authorizedContext = isAuthorized(ctx)

  return options.next({ ctx: authorizedContext })
})
