import { Card, CardContent, CardFooter } from '../ui/card'

export type LearnKanjiItemProps = {
  kanji: string
  level: string
  grade: string
}

export default function LearnKanjiItem({
  kanji,
  level,
  grade,
}: LearnKanjiItemProps) {
  return (
    <Card className='flex-1'>
      <CardContent className='text-6xl font-bold text-center mb-4'>
        {kanji}
      </CardContent>
      <CardFooter className='flex items-center gap-4'>
        <div className='w-full p-2 text-center border'>{level}</div>
        <div className='w-full p-2 text-center border'>{grade}</div>
      </CardFooter>
    </Card>
  )
}
