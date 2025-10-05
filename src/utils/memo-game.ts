import { MemoGameChoice } from "#/types"

export const checkMemoGamePairs = (
  pairs: { [key: string]: string },
  firstChoice: MemoGameChoice,
  secondChoice: MemoGameChoice
) => {
  if (!firstChoice || !secondChoice) return false

  return (
    pairs[firstChoice.value] === secondChoice.value ||
    pairs[secondChoice.value] === firstChoice.value
  )
}
