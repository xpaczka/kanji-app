import { NextRequest } from "next/server"
import updateSession from "./database/middleware"

// TODO: Add route protection
const middleware = async (req: NextRequest) => {
  return await updateSession(req)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
}

export default middleware
