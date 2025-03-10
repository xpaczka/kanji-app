import { AspectRatio } from '#/components/ui/aspect-ratio'
import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/utils'

type FlashcardsLevelChoiceProps = {
  title: string
  isDisabled: boolean
}

export default function FlashcardsLevelChoice({
  title,
  isDisabled,
}: FlashcardsLevelChoiceProps) {
  return (
    <AspectRatio ratio={16 / 9}>
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
