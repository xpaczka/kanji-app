import Auth from "#/components/auth/Auth"
import { Button } from "#/components/ui/button"
import { ROUTES } from "#/constants/router"
import { getSession } from "#/lib/session"
import Link from "next/link"

export default async function Home() {
  const session = await getSession()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex items-center gap-8 sm:items-start">
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
