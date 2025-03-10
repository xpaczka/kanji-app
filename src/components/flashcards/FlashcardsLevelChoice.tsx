'use client'

import { AspectRatio } from '#/components/ui/aspect-ratio'
import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { v4 as uuid } from 'uuid'

type FlashcardsLevelChoiceProps = {
  title: string
  isDisabled: boolean
}

export default function FlashcardsLevelChoice({
  title,
  isDisabled,
}: FlashcardsLevelChoiceProps) {
  const { push, forward } = useRouter()

  const flashcardsSessionHandler = useCallback(() => {
    const sessionId = uuid()

    push(`/learn/flashcards/${sessionId}`)
    forward()
  }, [push, forward])

  return (
    <AspectRatio
      className='cursor-pointer'
      ratio={16 / 9}
      onClick={flashcardsSessionHandler}
    >
      <Card
        className={cn(
          'h-full w-full',
          isDisabled ? 'opacity-30' : 'opacity-100'
        )}
      >
        <CardContent className='w-full h-full flex justify-center items-center text-4xl font-bold'>
          {title}
        </CardContent>
      </Card>
    </AspectRatio>
  )
}
