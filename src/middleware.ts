import { NextRequest, NextResponse } from "next/server"
import updateSession from "./database/middleware"

const middleware = async (req: NextRequest) => {
  const authorized = !!req.cookies.get("sb-127-auth-token")
  const path = req.nextUrl.pathname

  if (!authorized && path !== "/") {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return await updateSession(req)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
}

export default middleware
