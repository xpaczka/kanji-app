import { SignIn as SignInForm } from '@clerk/nextjs'

export default function SignIn() {
  return (
    <div className='min-h-screen grid items-center justify-items-center'>
      <SignInForm />
    </div>
  )
}
