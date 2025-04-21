import { TRPC_LINKS } from "#/constants/misc"
import { getSession } from "#/lib/session"
import { JWTPayload } from "jose"

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>

const getContextUserId = (session: JWTPayload | null | undefined) =>
  session && typeof session === "object" && "userId" in session
    ? (session.userId as string)
    : null

export const createTrpcContext = async () => {
  const session = await getSession()

  return { ...TRPC_LINKS, userId: getContextUserId(session) }
}
