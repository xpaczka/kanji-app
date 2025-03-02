import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Dashboard() {
  return (
    <SignedIn>
      <UserButton />
    </SignedIn>
  )
}
