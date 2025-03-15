import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { SESSION_TOKEN_COOKIE_NAME } from './lib/session'

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (/_next, /api)
     * - Static files (_next/static, _next/image, favicon.ico, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

const middleware = async (request: NextRequest): Promise<NextResponse> => {
  if (request.method === 'OPTIONS') {
    const response = NextResponse.next()

    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  }

  const token = request.cookies.get(SESSION_TOKEN_COOKIE_NAME)?.value ?? null
  const response = NextResponse.next()

  if (request.method === 'GET') {
    if (token !== null) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set(SESSION_TOKEN_COOKIE_NAME, token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return response
  }

  const originHeader = request.headers.get('Origin')
  const hostHeader = request.headers.get('Host')

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, { status: 403 })
  }

  try {
    const origin = new URL(originHeader)

    if (origin.host !== hostHeader) {
      return new NextResponse(null, { status: 403 })
    }
  } catch {
    return new NextResponse(null, { status: 403 })
  }

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  return response
}

export default middleware
