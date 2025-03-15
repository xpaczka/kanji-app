import { NextResponse } from 'next/server'
import {
  generateSessionToken,
  SESSION_EXPIRATION_TIME,
  SESSION_TOKEN_COOKIE_NAME,
} from '#/lib/session'

export const POST = async () => {
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_TIME)

  const response = NextResponse.json({ success: true, token })

  response.cookies.set(SESSION_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  })

  return response
}

export const DELETE = async () => {
  const response = NextResponse.json({ success: true })

  response.cookies.set(SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  })

  return response
}
