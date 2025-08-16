import Auth from "#/components/Auth/Auth"
import Dashboard from "#/components/Dashboard"
import { createServerClient } from "./_trpc/server-client"

export default async function Home() {
  const serverClient = await createServerClient()
  const user = await serverClient.user.getUser()

  return user ? <Dashboard /> : <Auth />
}
