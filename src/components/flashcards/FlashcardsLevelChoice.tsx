'use client'

import { AspectRatio } from '#/components/ui/aspect-ratio'
import { Card, CardContent } from '#/components/ui/card'
import { KanjiItemJlptLevel } from '#/database/schema'
import { useFlashcardsLevelChoice } from '#/hooks/flashcards'
import { cn } from '#/lib/utils'

type FlashcardsLevelChoiceProps = {
  title: string
  level?: KanjiItemJlptLevel
  isDisabled: boolean
}

export default function FlashcardsLevelChoice({
  title,
  level,
  isDisabled,
}: FlashcardsLevelChoiceProps) {
  const { startFlashcardsSession } = useFlashcardsLevelChoice(isDisabled, level)

  return (
    <AspectRatio
      className={isDisabled ? 'cursor-auto' : 'cursor-pointer'}
      ratio={16 / 9}
      onClick={startFlashcardsSession}
    >
      <Card
        className={cn(
          'h-full w-full',
          isDisabled ? 'opacity-30' : 'opacity-100'
        )}
      >
        <CardContent className='w-full h-full flex justify-center items-center text-4xl font-bold'>
          {title.toUpperCase()}
        </CardContent>
      </Card>
    </AspectRatio>
  )
}
