import { eq } from 'drizzle-orm'

import {
  type DatabaseUser,
  type DatabaseSession,
  sessionTable,
  userTable,
} from '#/database/schema'
import { database } from '#/database'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from './utils'

export type SessionValidationResult = {
  session: DatabaseSession | null
  user: DatabaseUser | null
}

export const SESSION_TOKEN_COOKIE_NAME = 'KANJI_SESSION'
export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30

const getSessionId = async (token: string): Promise<string> => {
  const encodedToken = new TextEncoder().encode(token)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedToken)

  return encodeHexLowerCase(new Uint8Array(hashBuffer))
}

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)

  return encodeBase32LowerCaseNoPadding(bytes)
}

export const createSession = async (
  token: string,
  userId: number
): Promise<DatabaseSession> => {
  const sessionId = await getSessionId(token)

  // Create database session object
  const session: DatabaseSession = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_EXPIRATION_TIME),
  }

  // Insert session instance into database
  await database.insert(sessionTable).values(session)

  return session
}

export const validateSessionToken = async (
  token: string
): Promise<SessionValidationResult> => {
  const sessionId = await getSessionId(token)

  // Query user's session from database
  const result = await database
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId))

  // There can only be one valid session for user
  if (result.length < 1) {
    return { session: null, user: null }
  }

  const { user, session } = result[0]
  const sessionExpirationTime = session.expiresAt.getTime()

  // Check if session hasn't expired
  if (Date.now() >= sessionExpirationTime) {
    await database.delete(sessionTable).where(eq(sessionTable.id, session.id))

    return { session: null, user: null }
  }

  if (Date.now() >= sessionExpirationTime - SESSION_EXPIRATION_TIME / 2) {
    session.expiresAt = new Date(Date.now() + SESSION_EXPIRATION_TIME)

    await database
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, session.id))
  }

  return { session, user }
}

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await database.delete(sessionTable).where(eq(sessionTable.id, sessionId))
}

export const invalidateAllSessions = async (userId: number): Promise<void> => {
  await database.delete(sessionTable).where(eq(sessionTable.userId, userId))
}
