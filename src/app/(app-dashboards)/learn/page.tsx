import DashboardProgressItem from '#/components/dashboard/DashboardProgressItem'
import DashboardActionItem from '#/components/dashboard/DashboardActionItem'
import LearnKanjiItem, {
  LearnKanjiItemProps,
} from '#/components/learn/LearnKanjiItem'
import { serverClient } from '#/app/_trpc/server-client'

const RECENT_SYMBOLS: LearnKanjiItemProps[] = [
  { kanji: '私', level: 'N5', grade: 'A' },
  { kanji: '水', level: 'N4', grade: 'D' },
  { kanji: '足', level: 'N5', grade: 'B' },
  { kanji: '駅', level: 'N3', grade: 'F' },
  { kanji: '空', level: 'N5', grade: 'C' },
]

export default async function Learn() {
  const learningOverview = await serverClient.user.getSelectedUserProgress({
    username: 'user',
    key: 'learningOverview',
  })

  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>Learn</h1>
      <div className='w-1/2 flex items-center gap-6 mb-8'>
        {learningOverview.map(({ name, value }) => (
          <DashboardProgressItem
            key={name}
            title={name}
            progress={value}
            className='w-full'
          />
        ))}
      </div>
      <div className='w-full flex items-center gap-6 mb-8'>
        <DashboardActionItem title='Flashcards'>
          Improve your Kanji skills <br />
          with the help of flashcards
        </DashboardActionItem>
        <DashboardActionItem title='Test'>
          Check your current knowledge <br />
          with a quick Kanji test
        </DashboardActionItem>
      </div>
      <div className='w-full flex justify-between items-end mb-4'>
        <p className='text-lg font-bold'>Recent symbols</p>
        <p className='pointer underline'>All symbols</p>
      </div>
      <div className='w-full flex gap-6'>
        {RECENT_SYMBOLS.map(({ kanji, grade, level }) => (
          <LearnKanjiItem
            key={kanji}
            kanji={kanji}
            grade={grade}
            level={level}
          />
        ))}
      </div>
    </>
  )
}
