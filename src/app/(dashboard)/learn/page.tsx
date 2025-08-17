import { createServerClient } from "#/app/_trpc/server-client"
import { LayoutSection } from "#/components/Layout"
import { LearnModule } from "#/components/Learn"
import { formatReadings, shuffle } from "#/lib/utils"

export default async function LearnPage() {
  const serverClient = await createServerClient()
  const learnItems = await serverClient.learn.getLearnItems()

  const separatedLearnItems = shuffle(
    learnItems.flatMap(({ kanji, on_readings, meanings }) => [
      ...(meanings.length > 0 ? [{ kanji, meanings }] : []),
      ...(on_readings.length > 0
        ? [{ kanji, readings: formatReadings(on_readings) }]
        : [])
    ])
  )

  return (
    <LayoutSection header="Learn">
      <LearnModule items={separatedLearnItems} />
    </LayoutSection>
  )
}
