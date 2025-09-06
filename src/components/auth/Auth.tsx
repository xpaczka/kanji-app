"use client"

import { useMemo, useState } from "react"
import { Card, CardTitle, CardHeader, CardFooter } from "../ui/card"
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
        <Card className="min-w-[420px] p-12">
          <CardHeader>
            <CardTitle className="text-center">
              {isSignInFlow ? "Sign in" : "Sign up"}
            </CardTitle>
          </CardHeader>
          {isSignInFlow ? <SignIn /> : <SignUp />}
          <CardFooter className="flex justify-center">
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
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
