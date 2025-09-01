import { createServerClient } from "#/app/_trpc/server-client"
import { LayoutSection } from "#/components/Layout"
import { LearnModule } from "#/components/Learn"

// TODO: The module itself should be adjusted for a review flow
export default async function ReviewPage() {
  const serverClient = await createServerClient()
  const learnItems = await serverClient.review.getReviewItems()

  return (
    <LayoutSection header="Review">
      {/* @ts-expect-error FIXME: Pass correct values */}
      <LearnModule items={learnItems} />
    </LayoutSection>
  )
}
