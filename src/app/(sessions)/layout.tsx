import { ReactNode } from 'react'
import EndSessionButton from '#/components/buttons/EndSessionButton'

export default function SessionLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative w-full h-screen flex flex-col justify-center items-center'>
      <div className='absolute top-0 left-0 right-0 px-10 pt-6 flex justify-between items-center'>
        {/* TODO: Dynamically generate page title */}
        <h1 className='text-lg'>Flashcards</h1>
        <EndSessionButton />
      </div>
      {children}
    </div>
  )
}
