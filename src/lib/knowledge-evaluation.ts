import { KanjiItemJlptLevel } from "#/database/schema"

// Using integers instead of decimals to prevent precision issues when
// adding them together. These values should be later divided by 10
// to get maximum of 100
const KNOWLEDGE_TEST_LEVEL_SCALE: Record<KanjiItemJlptLevel, number> = {
  "jlpt-n5": 10,
  "jlpt-n4": 15,
  "jlpt-n3": 20,
  "jlpt-n2": 25,
  "jlpt-n1": 30
}

const KNOWLEDGE_TEST_LEVEL_THRESHOLDS: Record<KanjiItemJlptLevel, number> = {
  "jlpt-n5": 0.3,
  "jlpt-n4": 0.55,
  "jlpt-n3": 0.75,
  "jlpt-n2": 0.9,
  "jlpt-n1": 1
}

export const evaluateKnowledgeTestItemScore = (
  correctAnswer: string,
  userAnswer: string,
  level: KanjiItemJlptLevel
) => (correctAnswer === userAnswer ? KNOWLEDGE_TEST_LEVEL_SCALE[level] : 0)

export const getKnowledgeEvaluationResult = (
  score: number
): KanjiItemJlptLevel => {
  if (score <= KNOWLEDGE_TEST_LEVEL_THRESHOLDS["jlpt-n5"]) return "jlpt-n5"

  if (score <= KNOWLEDGE_TEST_LEVEL_THRESHOLDS["jlpt-n4"]) return "jlpt-n4"

  if (score <= KNOWLEDGE_TEST_LEVEL_THRESHOLDS["jlpt-n3"]) return "jlpt-n3"

  if (score <= KNOWLEDGE_TEST_LEVEL_THRESHOLDS["jlpt-n2"]) return "jlpt-n2"

  return "jlpt-n1"
}
