'use client'

import { useMemo, useState } from 'react'
import { Card, CardTitle, CardHeader, CardFooter } from '../ui/card'
import SignUp from './SignUp'

enum AuthFlow {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

export default function Auth() {
  const [authFlow, setAuthFlow] = useState<AuthFlow>(AuthFlow.SIGN_IN)

  const isSignInFlow = useMemo(() => authFlow === AuthFlow.SIGN_IN, [authFlow])

  return (
    <Card className='p-12 min-w-[420px]'>
      <CardHeader>
        <CardTitle className='text-center'>
          {isSignInFlow ? 'Sign in' : 'Sign up'}
        </CardTitle>
      </CardHeader>
      {isSignInFlow ? 'Sign in' : <SignUp />}
      <CardFooter className='flex justify-center'>
        <div>
          {isSignInFlow ? 'No account yet?' : 'Already have an account?'}{' '}
          <span
            className='font-bold cursor-pointer'
            onClick={() =>
              setAuthFlow(isSignInFlow ? AuthFlow.SIGN_UP : AuthFlow.SIGN_IN)
            }
          >
            {isSignInFlow ? 'Sign up' : 'Sign up'}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
