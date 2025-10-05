import { Authorization } from "#/components/Authorization"
import Dashboard from "#/components/Dashboard"
import createSupabaseClient from "#/database/client"

export default async function Home() {
  const supabase = await createSupabaseClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return user ? <Dashboard /> : <Authorization />
}
