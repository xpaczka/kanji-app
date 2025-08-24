import { createServerClient } from "#/app/_trpc/server-client"
import { LayoutSection } from "#/components/Layout"
import { LearnModule } from "#/components/Learn"

export default async function LearnPage() {
  const serverClient = await createServerClient()
  const learnItems = await serverClient.learn.getLearnItems()

  return (
    <LayoutSection header="Learn">
      <LearnModule items={learnItems} />
    </LayoutSection>
  )
}
