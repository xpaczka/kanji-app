import FlashcardsLevelChoice from '#/components/flashcards/FlashcardsLevelChoice'
import { KanjiLevel } from '#/schemas/learn'

type FlashcardsLevelChoiceItem = {
  level: KanjiLevel
  isDisabled?: boolean
}

const LEVELS: FlashcardsLevelChoiceItem[] = [
  { level: 'N5' },
  { level: 'N4' },
  { level: 'N3', isDisabled: true },
  { level: 'N2', isDisabled: true },
  { level: 'N1', isDisabled: true },
]

export default function FlashcardsPage() {
  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-6'>
      {LEVELS.map(({ level, isDisabled }) => (
        <FlashcardsLevelChoice
          key={level}
          title={level}
          isDisabled={!!isDisabled}
        />
      ))}
      <FlashcardsLevelChoice title='All evels' isDisabled={false} />
    </div>
  )
}
