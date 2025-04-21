import { initTRPC } from "@trpc/server"
import { TrpcContext } from "./context"

const t = initTRPC.context<TrpcContext>().create()

export const router = t.router
export const createCallerFactory = t.createCallerFactory

export const publicProcedure = t.procedure

// TODO: Add protected procedure for user
