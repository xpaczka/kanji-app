import FlashcardsLevelChoice from '#/components/flashcards/FlashcardsLevelChoice'
import { KanjiItemJlptLevel } from '#/database/schema'

type FlashcardsLevelChoiceItem = {
  level: KanjiItemJlptLevel
  isDisabled?: boolean
}

const LEVELS: FlashcardsLevelChoiceItem[] = [
  { level: 'jlpt-n5' },
  { level: 'jlpt-n4' },
  { level: 'jlpt-n3', isDisabled: true },
  { level: 'jlpt-n2', isDisabled: true },
  { level: 'jlpt-n1', isDisabled: true },
]

export default function FlashcardsPage() {
  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-6'>
      {LEVELS.map(({ level, isDisabled }) => (
        <FlashcardsLevelChoice
          key={level}
          title={level}
          isDisabled={!!isDisabled}
          level={level}
        />
      ))}
      <FlashcardsLevelChoice title='All levels' isDisabled={false} />
    </div>
  )
}
