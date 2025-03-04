import { Button } from "#/components/ui/button"
import { SignIn as SignInForm } from "@clerk/nextjs"
import Link from "next/link"

export default function SignIn() {
  return (
    <>
      <Button className="absolute">
        <Link href="/">Back to main page</Link>
      </Button>
      <div className="grid min-h-screen items-center justify-items-center">
        <SignInForm />
      </div>
    </>
  )
}
