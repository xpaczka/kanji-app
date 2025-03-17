import { Button } from '#/components/ui/button'
import { ROUTES } from '#/constants/router'
import { SignIn as SignInForm } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignIn() {
  return (
    <>
      <Button className='absolute'>
        <Link href={ROUTES.index}>Back to main page</Link>
      </Button>
      <div className='min-h-screen grid items-center justify-items-center'>
        <SignInForm />
      </div>
    </>
  )
}
