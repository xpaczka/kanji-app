import DashboardActionItem from '#/components/dashboard/DashboardActionItem'
import LearnKanjiItem from '#/components/learn/LearnKanjiItem'
import { serverClient } from '#/app/_trpc/server-client'
import LearnDiscoveredKanji from '#/components/learn/LearnDiscoveredKanji'
import DashboardLearningOverview from '#/components/dashboard/DashboardLearningOverview'
import Link from 'next/link'

export default async function Learn() {
  const recentKanji = await serverClient.learn.getRecentKanji('user')

  return (
    <>
      <div className='grid grid-cols-5 gap-6 mb-8'>
        <div className='col-start-1 col-end-4'>
          <Link href='/learn/flashcards'>
            <DashboardActionItem title='Flashcards'>
              Improve your Kanji skills <br />
              with the help of flashcards
            </DashboardActionItem>
          </Link>
        </div>
        <div className='col-start-4 col-end-6'>
          <DashboardLearningOverview />
        </div>
      </div>
      <div className='w-full flex justify-between items-end mb-4'>
        <p className='text-lg font-bold'>Recent kanji</p>
        <LearnDiscoveredKanji />
      </div>
      <div className='w-full flex gap-6'>
        {recentKanji.map(({ kanji, proficiency, level }) => (
          <LearnKanjiItem
            key={kanji}
            kanji={kanji}
            proficiency={proficiency}
            level={level}
          />
        ))}
      </div>
    </>
  )
}
