import { Button } from '#/components/ui/button'
import { serverClient } from './_trpc/server-client'

export default async function Home() {
  await serverClient.session.setSessionTokenCookie()

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex gap-8 row-start-2 items-center sm:items-start'>
        <Button>Sign in</Button>
        <Button variant='secondary'>Sign up</Button>
      </main>
    </div>
  )
}
