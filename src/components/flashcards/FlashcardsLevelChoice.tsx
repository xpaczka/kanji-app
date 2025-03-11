'use client'

import { AspectRatio } from '#/components/ui/aspect-ratio'
import { Card, CardContent } from '#/components/ui/card'
import { useNavigation } from '#/hooks/router'
import { cn } from '#/lib/utils'
import { KanjiItemJlptLevel } from '#/schemas/kanji'
import { useCallback } from 'react'
import { v4 as uuid } from 'uuid'

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
  const { navigate } = useNavigation()

  const flashcardsSessionHandler = useCallback(() => {
    if (isDisabled) return

    const sessionId = uuid()
    const levelParam = level ? `?level=${level}` : ''

    navigate(`/learn/flashcards/${sessionId}${levelParam}`)
  }, [navigate, level, isDisabled])

  return (
    <AspectRatio
      className={isDisabled ? 'cursor-auto' : 'cursor-pointer'}
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
          {title.toUpperCase()}
        </CardContent>
      </Card>
    </AspectRatio>
  )
}
