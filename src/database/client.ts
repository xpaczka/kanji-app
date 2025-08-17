import { SupabaseDbClient } from "#/types"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const createSupabaseClient = async (): Promise<SupabaseDbClient> => {
  const cookieStore = await cookies()

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.DATABASE_URL!,
    process.env.DATABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  )
}

export default createSupabaseClient
