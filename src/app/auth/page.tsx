'use client'

import AuthProviders from '#/components/auth/auth-providers'
import SignInForm from '#/components/auth/sign-in-form'
import SignUpForm from '#/components/auth/sign-up-form'
import { Button } from '#/components/ui/button'
import { useCallback, useState } from 'react'

enum FormType {
  SIGN_IN = 'Sign in',
  SIGN_UP = 'Sign up',
}

export default function Auth() {
  const [formType, setFormType] = useState<FormType>(FormType.SIGN_IN)

  const changeFormTypeHandler = useCallback(() => {
    setFormType((prev) =>
      prev === FormType.SIGN_IN ? FormType.SIGN_UP : FormType.SIGN_IN
    )
  }, [])

  return (
    <div className='grid items-center justify-items-center min-h-screen'>
      <div className='flex flex-col items-center gap-4 border border-black p-8 rounded-sm'>
        <h1>{formType}</h1>
        {formType === FormType.SIGN_IN ? <SignInForm /> : <SignUpForm />}
        <p>Forgot password?</p>
        <p>Or {formType.toLowerCase()} with</p>
        <AuthProviders />
        <div>
          No account?{' '}
          <Button onClick={changeFormTypeHandler}>
            {formType === FormType.SIGN_IN
              ? FormType.SIGN_UP
              : FormType.SIGN_IN}
          </Button>
        </div>
      </div>
    </div>
  )
}
