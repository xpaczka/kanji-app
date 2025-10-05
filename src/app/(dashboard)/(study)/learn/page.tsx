import { createServerClient } from "#/app/_trpc/server-client"
import LayoutSection from "#/components/LayoutSection"
import { LearnModule } from "#/components/Learn"

export default async function LearnPage() {
  const serverClient = await createServerClient()
  const { items: learnItems } = await serverClient.learn.getLearnItems()

  return (
    <LayoutSection header="Learn">
      <LearnModule items={learnItems} />
    </LayoutSection>
  )
}
