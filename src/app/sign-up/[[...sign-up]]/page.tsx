import { Button } from "#/components/ui/button"
import { SignUp as SignUpForm } from "@clerk/nextjs"
import Link from "next/link"

export default function SignUp() {
    return (
        <>
            <Button className="absolute">
                <Link href="/">Back to main page</Link>
            </Button>
            <div className="grid min-h-screen items-center justify-items-center">
                <SignUpForm />
            </div>
        </>
    )
}
