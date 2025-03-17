import { Button } from '#/components/ui/button'
import { ROUTES } from '#/constants/router'
import { SignUp as SignUpForm } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <Button className='absolute'>
        <Link href={ROUTES.index}>Back to main page</Link>
      </Button>
      <div className='min-h-screen grid items-center justify-items-center'>
        <SignUpForm />
      </div>
    </>
  )
}
