"use client"

import { useMemo, useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

enum AuthFlow {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up"
}

export default function Auth() {
  const [authFlow, setAuthFlow] = useState<AuthFlow>(AuthFlow.SIGN_IN)

  const isSignInFlow = useMemo(() => authFlow === AuthFlow.SIGN_IN, [authFlow])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16">
      <main className="row-start-2 flex items-center gap-8 sm:items-start">
        <div className="min-w-[420px] rounded-md bg-white p-12 shadow-md">
          <div>
            <div className="text-center">
              {isSignInFlow ? "Sign in" : "Sign up"}
            </div>
          </div>
          {isSignInFlow ? <SignIn /> : <SignUp />}
          <div className="flex justify-center">
            <div>
              {isSignInFlow ? "No account yet?" : "Already have an account?"}{" "}
              <span
                className="cursor-pointer font-bold"
                onClick={() =>
                  setAuthFlow(
                    isSignInFlow ? AuthFlow.SIGN_UP : AuthFlow.SIGN_IN
                  )
                }
              >
                {isSignInFlow ? "Sign up" : "Sign in"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
