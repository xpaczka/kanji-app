import TopNavigation from '#/components/navigation/top-navigation'
import { SignedIn } from '@clerk/nextjs'

export default function Games() {
  return (
    <div className='min-h-screen'>
      <SignedIn>
        <TopNavigation />
      </SignedIn>
    </div>
  )
}
