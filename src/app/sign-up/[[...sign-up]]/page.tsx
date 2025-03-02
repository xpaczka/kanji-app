import { SignUp as SignUpForm } from '@clerk/nextjs'

export default function SignUp() {
  return (
    <div className='min-h-screen grid items-center justify-items-center'>
      <SignUpForm />
    </div>
  )
}
