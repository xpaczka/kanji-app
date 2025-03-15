import { Button } from '#/components/ui/button'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex gap-8 row-start-2 items-center sm:items-start'>
        <SignedOut>
          <Button>
            <Link href='/sign-in'>Sign in</Link>
          </Button>
          <Button variant='secondary'>
            <Link href='/sign-up'>Sign up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button>
            <Link href='/dashboard'>Dashboard</Link>
          </Button>
        </SignedIn>
      </main>
    </div>
  )
}
