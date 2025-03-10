import { Card, CardContent, CardFooter } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { KanjiItem } from '#/schemas/kanji'

type FlashcardSessionItemProps = {
  kanji: KanjiItem
  isRevealed: boolean
  onRevealClick: () => void
  onEvaluateClick: () => void
}

export default function FlashcardSessionItem({
  kanji,
  isRevealed,
  onRevealClick,
  onEvaluateClick,
}: FlashcardSessionItemProps) {
  if (isRevealed) {
    return (
      <Card className='w-full aspect-square items-center p-12'>
        <CardContent className='flex flex-col justify-center items-center flex-1 text-center'>
          {/* TODO: Conditionally render kun or on readings: https://www.thoughtco.com/learning-japanese-4070947 */}
          <p className='font-bold text-xl'>{kanji.kun_readings.join(', ')}</p>
          <p> {/* TODO: Add romaji */}</p>
          <p>{kanji.meanings.join(', ')}</p>
        </CardContent>
        <CardFooter className='flex items-center gap-2'>
          <Button size='lg' onClick={onEvaluateClick}>
            Fail
          </Button>
          <Button size='lg' onClick={onEvaluateClick}>
            Hard
          </Button>
          <Button size='lg' onClick={onEvaluateClick}>
            Good
          </Button>
          <Button size='lg' onClick={onEvaluateClick}>
            Easy
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className='w-full aspect-square items-center p-12'>
      <CardContent className='flex justify-center items-center flex-1 text-9xl'>
        {kanji.kanji}
      </CardContent>
      <CardFooter>
        <Button size='lg' onClick={onRevealClick}>
          Flip
        </Button>
      </CardFooter>
    </Card>
  )
}
