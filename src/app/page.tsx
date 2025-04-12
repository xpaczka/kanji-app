import Auth from "#/components/auth/Auth"
import { Button } from "#/components/ui/button"
import { ROUTES } from "#/constants/router"
import { getSession } from "#/lib/session"
import Link from "next/link"

export default async function Home() {
  const session = await getSession()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        {session ? (
          <Link href={ROUTES.mainDashboard}>
            <Button>Go to dashboard</Button>
          </Link>
        ) : (
          <Auth />
        )}
      </main>
    </div>
  )
}
