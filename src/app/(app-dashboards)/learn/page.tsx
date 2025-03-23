import LearnKanjiItem from '#/components/learn/LearnKanjiItem'
import { serverClient } from '#/app/_trpc/server-client'
import LearnDiscoveredKanji from '#/components/learn/LearnDiscoveredKanji'
import DashboardLearningOverview from '#/components/dashboard/DashboardLearningOverview'
import FlashcardsButton from '#/components/flashcards/FlashcardsButton'

export default async function Learn() {
  const recentKanji = await serverClient.learn.getRecentKanji('user')

  return (
    <>
      <div className='grid grid-cols-5 gap-6 mb-8'>
        <div className='col-start-1 col-end-4'>
          <FlashcardsButton />
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
        {recentKanji.map(({ kanji, proficiency, level }, index) => (
          <LearnKanjiItem
            key={`${kanji}-${index}`}
            kanji={kanji}
            proficiency={proficiency}
            level={level}
          />
        ))}
      </div>
    </>
  )
}
