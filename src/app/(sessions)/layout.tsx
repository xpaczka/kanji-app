import { ReactNode } from 'react'
import EndAppSessionButton from '#/components/buttons/EndAppSessionButton'
import SessionPageHeader from '#/components/layout/SessionPageHeader'

export default function SessionLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative w-full h-screen flex flex-col justify-center items-center'>
      <div className='absolute top-0 left-0 right-0 px-10 pt-6 flex justify-between items-center'>
        <SessionPageHeader />
        <EndAppSessionButton />
      </div>
      {children}
    </div>
  )
}
