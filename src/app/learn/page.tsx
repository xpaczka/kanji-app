import TopNavigation from '#/components/navigation/top-navigation'
import { SignedIn } from '@clerk/nextjs'

export default function Learn() {
  return (
    <div className='min-h-screen'>
      <SignedIn>
        <TopNavigation />
      </SignedIn>
    </div>
  )
}
