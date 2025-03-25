import SignUpForm from '#/components/auth/SignUpForm'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex gap-8 row-start-2 items-center sm:items-start'>
        <SignUpForm />
      </main>
    </div>
  )
}
