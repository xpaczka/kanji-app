import { createServerClient } from "#/app/_trpc/server-client"
import LayoutSection from "#/components/LayoutSection"
import { ReviewModule } from "#/components/Review"

export default async function ReviewPage() {
  const serverClient = await createServerClient()
  const { items: reviewItems } = await serverClient.review.getReviewItems()

  return (
    <LayoutSection header="Review">
      <ReviewModule items={reviewItems} />
    </LayoutSection>
  )
}
