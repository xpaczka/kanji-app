"use client"

import { useMemo, useState } from "react"
import { AuthorizationSignIn, AuthorizationSignUp } from "."

enum AuthorizationFlow {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up"
}

export default function Authorization() {
  const [authFlow, setAuthFlow] = useState<AuthorizationFlow>(
    AuthorizationFlow.SIGN_IN
  )

  const isSignInFlow = useMemo(
    () => authFlow === AuthorizationFlow.SIGN_IN,
    [authFlow]
  )

  return (
    <div className="flex justify-center">
      <div className="w-[420px] rounded-md bg-white p-12 shadow-2xl">
        <div className="mb-4 text-center text-xl font-medium">
          {isSignInFlow ? "Sign in" : "Sign up"}
        </div>
        {isSignInFlow ? <AuthorizationSignIn /> : <AuthorizationSignUp />}
        <div className="mt-4 flex justify-center">
          <div className="flex flex-col items-center">
            {isSignInFlow ? "No account yet?" : "Already have an account?"}{" "}
            <span
              className="cursor-pointer font-bold"
              onClick={() =>
                setAuthFlow(
                  isSignInFlow
                    ? AuthorizationFlow.SIGN_UP
                    : AuthorizationFlow.SIGN_IN
                )
              }
            >
              {isSignInFlow ? "Sign up" : "Sign in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
