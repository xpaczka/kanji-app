import { Card, CardContent, CardFooter } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { KanjiItem } from '#/schemas/kanji'
import { SessionItemEvaluation } from './FlashcardsSessionSummary'
import FlashcardsSessionReading from './FlashcardsSessionReading'

type FlashcardSessionItemProps = {
  kanji: KanjiItem
  isRevealed: boolean
  onRevealClick: () => void
  onEvaluateClick: (evalution: SessionItemEvaluation) => void
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
          <div className='flex flex-col items-center gap-3 mb-6'>
            <div className='flex flex-col items-center'>
              {kanji.on_readings.length > 0 && (
                <FlashcardsSessionReading tooltipContent='On-reading is usually used when the kanji is a part of a compound (two or more kanji characters are placed side by site)'>
                  On readings
                </FlashcardsSessionReading>
              )}
              <p className='font-bold text-2xl'>
                {kanji.on_readings.join(', ')}
              </p>
            </div>
            <div className='flex flex-col items-center'>
              {kanji.kun_readings.length > 0 && (
                <FlashcardsSessionReading tooltipContent='Kun-reading is used when the kanji is used on its own, either as a complete noun or as adjective stems and verb stems'>
                  Kun readings
                </FlashcardsSessionReading>
              )}
              <p className='font-bold text-2xl'>
                {kanji.kun_readings.join(', ')}
              </p>
            </div>
          </div>
          <p className='italic'>{kanji.meanings.join(', ')}</p>
        </CardContent>
        <CardFooter className='flex items-center gap-2'>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.FAIL)}
          >
            Fail
          </Button>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.HARD)}
          >
            Hard
          </Button>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.GOOD)}
          >
            Good
          </Button>
          <Button
            className='cursor-pointer'
            size='lg'
            onClick={() => onEvaluateClick(SessionItemEvaluation.EASY)}
          >
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
        <Button className='cursor-pointer' size='lg' onClick={onRevealClick}>
          Flip
        </Button>
      </CardFooter>
    </Card>
  )
}
