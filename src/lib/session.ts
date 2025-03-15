import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'
import { eq } from 'drizzle-orm'

import {
  type DatabaseUser,
  type DatabaseSession,
  sessionTable,
  userTable,
} from '#/database/schema'
import { database } from '#/database'

type SessionValidationResult = {
  session: DatabaseSession | null
  user: DatabaseUser | null
}

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30

const getSessionId = (token: string): string =>
  encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)

  return encodeBase32LowerCaseNoPadding(bytes)
}

export const createSesion = async (
  token: string,
  userId: number
): Promise<DatabaseSession> => {
  const sessionId = getSessionId(token)

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
  const sessionId = getSessionId(token)

  // Query user's session from database
  const result = await database
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId))

  // There can only be one valid session for user
  if (result.length < 1) {
    // TODO: Should throw an error
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
