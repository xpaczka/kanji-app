import SignUp from '#/components/auth/SignUp'
import { getSession } from '#/lib/session'

export default async function Home() {
  await getSession()

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex gap-8 row-start-2 items-center sm:items-start'>
        <SignUp />
      </main>
    </div>
  )
}
