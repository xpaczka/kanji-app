import LearnDiscoveredKanji from "#/components/learn/LearnDiscoveredKanji"
import DashboardLearningOverview from "#/components/dashboard/DashboardLearningOverview"
import FlashcardsButton from "#/components/flashcards/FlashcardsButton"
import LearnRecentKanji from "#/components/learn/LearnRecentKanji"

export default function Learn() {
  return (
    <>
      <div className="mb-8 grid grid-cols-5 gap-6">
        <div className="col-start-1 col-end-4">
          <FlashcardsButton />
        </div>
        <div className="col-start-4 col-end-6">
          <DashboardLearningOverview />
        </div>
      </div>
      <div className="mb-4 flex w-full items-end justify-between">
        <p className="text-lg font-bold">Recent kanji</p>
        <LearnDiscoveredKanji />
      </div>
      <LearnRecentKanji />
    </>
  )
}
