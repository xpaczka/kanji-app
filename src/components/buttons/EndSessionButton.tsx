'use client'

import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { useCallback } from 'react'

export default function EndSessionButton() {
  const endSessionHandler = useCallback(() => {
    console.log('session end')
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>End session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center'>
            Do you want to end the session?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className='text-center py-8'>
            <p>All your progress will be lost!</p>
          </div>
        </DialogDescription>
        <DialogFooter>
          <div className='w-full flex justify-center gap-4'>
            <DialogClose asChild>
              <Button>Back to session</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={endSessionHandler} variant='secondary'>
                End session
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
