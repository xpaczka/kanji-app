export const calculateNextReviewTime = (newStage: number): string | null => {
  if (newStage < 1 || newStage > 10) {
    throw new Error("Stage value must be a value between 1 and 10")
  }

  // Reaching level 10 means items is burned
  // (no longer to be reviewed)
  if (newStage === 10) return null

  const baseHours = 2
  const growthFactor = 2.5

  const intervalInHours = baseHours * growthFactor ** (newStage - 1)
  const now = new Date()

  now.setTime(now.getTime() + intervalInHours * 60 * 60 * 1000)

  return now.toISOString()
}
