import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { decrypt, SESSION_COOKIE_NAME, updateSession } from './lib/session'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/']

const middleware = async (req: NextRequest) => {
  await updateSession(req)

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

export default middleware
