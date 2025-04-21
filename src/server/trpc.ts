import { initTRPC } from "@trpc/server"
import { Context } from "./context"

const t = initTRPC.context<Context>().create()

export const router = t.router
export const createCallerFactory = t.createCallerFactory

export const publicProcedure = t.procedure

// TODO: Add protected procedure for user
