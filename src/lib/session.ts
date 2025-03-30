import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '#/schemas/auth'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)

export const SESSION_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000
export const SESSION_COOKIE_NAME = 'KANJI_SESSION'

export const encrypt = async (payload: SessionPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)

export const decrypt = async (session: string | undefined = '') => {
  if (!session) return undefined

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (err) {
    console.error('Failed to verify session', err)
  }
}

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_TIME)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export const updateSession = async () => {
  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value
  const payload = await decrypt(session)

  if (!session || !payload) return null

  const expires = new Date(Date.now() + SESSION_EXPIRATION_TIME)
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export const deleteSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
